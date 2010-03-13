package com.browsermob.pageperf.server;

import org.codehaus.jackson.JsonNode;
import org.json.JSONException;

import java.net.MalformedURLException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class Session {
    private Date start;
    private Date end;
    private long timeActive;
    private int bytes;
    private int objectCount;
    private Map<String, Page> pages = new HashMap<String, Page>();

    public Session(JsonNode json) throws JSONException, ParseException, MalformedURLException {
        // pages
        for (JsonNode pageJson : json.get("pages")) {
            String ref = pageJson.get("id").getTextValue();
            this.pages.put(ref, new Page(pageJson));
        }

        // entries
        for (JsonNode entryJson : json.get("entries")) {
            String ref = entryJson.get("pageref").getTextValue();
            this.pages.get(ref).addEntry(new Entry(entryJson));
        }

        for (Page page : this.pages.values()) {
            if (start == null) {
                start = page.getStart();
            }

            if (page.getStart().after(start)) {
                start = page.getStart();
            }

            if (end == null) {
                end = page.getEnd();
            }

            if (page.getEnd().after(end)) {
                end = page.getEnd();
            }

            bytes += page.getBytes();
            objectCount += page.getEntries().size();
        }

        timeActive = end.getTime() - start.getTime();
    }

    public void update(ResultSet rs) throws SQLException {
        bytes += rs.getInt("bytes");
        objectCount += rs.getInt("obj_count");

        Date oldStart = rs.getTimestamp("start_time");
        if (oldStart.before(start)) {
            start = oldStart;
        }
        Date oldEnd = rs.getTimestamp("end_time");
        if (oldEnd.after(end)) {
            end = oldEnd;
        }
        timeActive = end.getTime() - start.getTime();
    }

    public Collection<Page> getPages() {
        return pages.values();
    }

    public int getBytes() {
        return bytes;
    }

    public int getObjectCount() {
        return objectCount;
    }

    public Date getStart() {
        return start;
    }

    public Date getEnd() {
        return end;
    }

    public long getTimeActive() {
        return timeActive;
    }
}
