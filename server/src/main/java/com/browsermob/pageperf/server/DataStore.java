package com.browsermob.pageperf.server;

import com.browsermob.pageperf.server.util.DataDir;
import com.browsermob.pageperf.server.util.SQLUtil;
import com.browsermob.pageperf.util.IOUtils;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ArrayNode;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletOutputStream;
import javax.sql.DataSource;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.sql.*;
import java.text.ParseException;
import java.util.*;

@Singleton
public class DataStore {
    private DataSource dataSource;
    private File harDir;
    private ObjectMapper objectMapper;

    @Inject
    public DataStore(DataSource dataSource, @DataDir File dataDir, ObjectMapper objectMapper) {
        this.dataSource = dataSource;
        this.objectMapper = objectMapper;
        this.harDir = new File(dataDir, "hars");
        this.harDir.mkdirs();

        try {
            Connection conn = dataSource.getConnection();
            String schema = IOUtils.readFully(getClass().getResourceAsStream("/schema.sql"));
            SQLUtil.runScript(schema, conn);
        } catch (SQLException e) {
            // this is OK, it's expected
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public long save(String testId, long sessionId, JsonNode json) throws SQLException, IOException {
        Session session;
        try {
            session = new Session(json.get("log"));
        } catch (Exception e) {
            throw new RuntimeException("!", e);
        }

        Connection conn = null;
        try {
            conn = dataSource.getConnection();

            if (sessionId <= 0) {
                sessionId = SQLUtil.insert(conn, "INSERT INTO session (bytes, end_time, obj_count, start_time, " +
                        "page_count, time_active, test_id)",
                        session.getBytes(), new Timestamp(session.getStart().getTime()), session.getObjectCount(),
                        new Timestamp(session.getStart().getTime()), session.getPages().size(), 1000, testId
                );
            } else {
                PreparedStatement ps = null;
                ResultSet rs = null;
                try {
                    ps = conn.prepareStatement("SELECT * FROM session WHERE session_id = ? AND test_id = ?");
                    ps.setLong(1, sessionId);
                    ps.setString(2, testId);
                    rs = ps.executeQuery();
                    if (!rs.next()) {
                        throw new RuntimeException("Unknown session ID " + sessionId);
                    }

                    session.update(rs);
                } finally {
                    SQLUtil.close(null, ps, rs);
                }
            }

            int i = 1;
            for (Page page : session.getPages()) {
                long pageId = SQLUtil.insert(conn, "INSERT INTO page (bytes, obj_count, page, time_active, " +
                        "on_content_load, on_load, end_time, start_time, title, session_id, test_id)",
                        page.getBytes(), page.getEntries().size(), i, 0, page.getOnContentLoad(),
                        page.getOnLoad(), new Timestamp(page.getStart().getTime()),
                        new Timestamp(page.getStart().getTime()), page.getTitle(), sessionId, testId);

                int j = 1;
                for (Entry entry : page.getEntries()) {
                    SQLUtil.insert(conn, "INSERT INTO object (method, url, protocol, host, domain, path, " +
                            "start_time, end_time, time_active, status_code, bytes, " +
                            "dns_lookup_time, connect_time, blocked_time, send_time, wait_time, receive_time, " +
                            "page_id, obj_num, partial_url_md5, session_id, test_id)",
                            entry.getMethod(), entry.getUrl(), entry.getProtocol(), entry.getHost(),
                            entry.getDomain(), entry.getPath(), new Timestamp(entry.getStart().getTime()),
                            new Timestamp(entry.getEnd().getTime()), entry.getTimeActive(), entry.getStatusCode(),
                            entry.getBytes(), entry.getDnsLookupTime(), entry.getConnectTime(), entry.getBlockedTime(),
                            entry.getSendTime(), entry.getWaitTime(), entry.getReceiveTime(),
                            pageId, j, entry.getPartialUrlMd5(), sessionId, testId);
                    j++;
                }

                i++;
            }

            // update the session in case this was part of a larger session
            SQLUtil.execute("UPDATE session SET bytes = " + session.getBytes() + ", obj_count = " + session.getObjectCount() + " WHERE session_id = " + sessionId, conn);

        } finally {
            SQLUtil.close(conn);
        }

        // now save the har file
        File harFile = new File(harDir, sessionId + ".har");
        if (harFile.exists()) {
            JsonNode original = objectMapper.readValue(harFile, JsonNode.class);
            json = merge(original, json);
        }

        objectMapper.writeValue(harFile, json);

        return sessionId;
    }

    private JsonNode merge(JsonNode original, JsonNode json) {
        ArrayNode an = (ArrayNode) json.get("log").get("pages");
        an.addAll((ArrayNode) original.get("log").get("pages"));

        an = (ArrayNode) json.get("log").get("entries");
        an.addAll((ArrayNode) original.get("log").get("entries"));
        
        return json;
    }

    public void writeSessionHar(long sessionId, ServletOutputStream outputStream) throws IOException {
        IOUtils.copy(new FileInputStream(new File(harDir, sessionId + ".har")), outputStream);
    }

    public List<String> getKnownTests() {
        ArrayList<String> ids = new ArrayList<String>();

        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            conn = dataSource.getConnection();
            ps = conn.prepareStatement("SELECT DISTINCT test_id FROM session");
            rs = ps.executeQuery();
            while (rs.next()) {
                ids.add(rs.getString(1));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            SQLUtil.close(conn, ps, rs);
        }

        return ids;
    }

    public <T extends AbstractEntry> List<? extends AbstractEntry> querySession(Metric<T> metric, String testId, Calendar start, Calendar end, Rollup rollup) {
        String sql = metric.sql(rollup);

        switch (rollup) {
            case NONE:
                start.add(Calendar.MINUTE, -60);
                end.add(Calendar.MINUTE, 60);
                break;
            case HOUR:
                start.add(Calendar.HOUR, -1);
                end.add(Calendar.HOUR, 1);
                break;
            case DAY:
                start.add(Calendar.HOUR, -24);
                end.add(Calendar.HOUR, 24);
                break;
        }

        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            conn = dataSource.getConnection();
            ps = conn.prepareStatement(sql);
            ps.setString(1, testId);
            ps.setTimestamp(2, new Timestamp(start.getTime().getTime()), start);
            ps.setTimestamp(3, new Timestamp(end.getTime().getTime()), end);

            rs = ps.executeQuery();

            List<T> results = new ArrayList<T>();
            while (rs.next()) {
                T t = metric.parse(rs, rollup, start.getTimeZone());
                results.add(t);
            }

            return results;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            SQLUtil.close(conn, ps, rs);
        }
    }
}
