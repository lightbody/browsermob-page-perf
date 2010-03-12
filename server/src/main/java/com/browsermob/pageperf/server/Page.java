package com.browsermob.pageperf.server;

import com.browsermob.pageperf.server.util.DateParser;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Page {
    private String title;
    private long onContentLoad;
    private long onLoad;
    private Date start;
    private int bytes;
    private List<Entry> entries = new ArrayList<Entry>();

    public Page(JSONObject json) throws JSONException, ParseException {
        title = json.getString("title");
        start = DateParser.parse(json.getString("startedDateTime"));
        JSONObject pageTimings = json.getJSONObject("pageTimings");
        onContentLoad = pageTimings.getLong("onContentLoad");
        onLoad = pageTimings.getLong("onLoad");
    }

    public void addEntry(Entry entry) {
        entries.add(entry);
        bytes += entry.getBytes();
    }

    public String getTitle() {
        return title;
    }

    public long getOnContentLoad() {
        return onContentLoad;
    }

    public long getOnLoad() {
        return onLoad;
    }

    public Date getStart() {
        return start;
    }

    public List<Entry> getEntries() {
        return entries;
    }

    public int getBytes() {
        return bytes;
    }
}
