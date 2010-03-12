package com.browsermob.pageperf.server;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.*;

public class Session {
    private Date start;
    private int bytes;
    private int objectCount;
    private Map<String, Page> pages = new HashMap<String, Page>();

    public Session(JSONObject json) throws JSONException, ParseException, MalformedURLException {
        // pages
        JSONArray pages = json.getJSONArray("pages");
        for (int i = 0; i < pages.length(); i++) {
            JSONObject pageJson = pages.getJSONObject(i);
            String ref = pageJson.getString("id");
            this.pages.put(ref, new Page(pageJson));
        }

        // entries
        JSONArray entries = json.getJSONArray("entries");
        for (int i = 0; i < entries.length(); i++) {
            JSONObject entryJson = entries.getJSONObject(i);
            String ref = entryJson.getString("pageref");
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
