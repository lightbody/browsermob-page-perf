package com.browsermob.pageperf.server;

import com.browsermob.pageperf.server.util.SQLUtil;
import com.browsermob.pageperf.util.IOUtils;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.json.JSONException;
import org.json.JSONObject;

import javax.sql.DataSource;
import java.io.IOException;
import java.net.MalformedURLException;
import java.sql.*;
import java.text.ParseException;

@Singleton
public class DataStore {
    private DataSource dataSource;

    @Inject
    public DataStore(DataSource dataSource) {
        this.dataSource = dataSource;

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



    public long save(String testId, long sessionId, JSONObject json) throws SQLException {
        Session session;
        try {
            session = new Session(json.getJSONObject("log"));
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

        return sessionId;
    }
}
