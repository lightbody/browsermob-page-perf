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

            bytes += page.getBytes();
            objectCount += page.getEntries().size();
        }

    }

    public void update(ResultSet rs) throws SQLException {
        bytes += rs.getInt("bytes");
        objectCount += rs.getInt("obj_count");
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
}
