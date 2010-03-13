package com.browsermob.pageperf.server;

import com.browsermob.pageperf.server.util.DateParser;
import org.codehaus.jackson.JsonNode;
import org.json.JSONException;

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

    public Page(JsonNode json) throws JSONException, ParseException {
        title = json.get("title").getTextValue();
        start = DateParser.parse(json.get("startedDateTime").getTextValue());
        JsonNode pageTimings = json.get("pageTimings");
        onContentLoad = pageTimings.get("onContentLoad").getLongValue();
        onLoad = pageTimings.get("onLoad").getLongValue();
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
