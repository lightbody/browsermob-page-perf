package com.browsermob.pageperf.server;

import com.browsermob.pageperf.server.util.DateParser;
import com.browsermob.pageperf.util.IOUtils;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.util.Date;

public class Entry {
    private String method;
    private String url;
    private String protocol;
    private String host;
    private String domain;
    private String path;
    private String partialUrlMd5;
    private Date start;
    private Date end;
    private long timeActive;
    private int statusCode;
    private int bytes;
    private long dnsLookupTime;
    private long connectTime;
    private long blockedTime;
    private long sendTime;
    private long waitTime;
    private long receiveTime;

    public Entry(JSONObject json) throws ParseException, JSONException, MalformedURLException {
        start = DateParser.parse(json.getString("startedDateTime"));
        timeActive = json.getLong("time");
        end = new Date(start.getTime() + timeActive);

        JSONObject req = json.getJSONObject("request");
        method = req.getString("method");
        url = req.getString("url");
        URL urlObj = new URL(url);
        protocol = urlObj.getProtocol();
        host = urlObj.getHost();
        domain = host; // todo
        path = urlObj.getPath();

        try {
            String partial = method + " " + protocol + "://" + host + "/" + path;
            partialUrlMd5 = IOUtils.md5(partial);
        } catch (Exception e) {
            partialUrlMd5 = "error_computing";
        }

        JSONObject res = json.getJSONObject("response");
        statusCode = res.getInt("status");
        bytes = res.getInt("bodySize");

        JSONObject timings = json.getJSONObject("timings");
        dnsLookupTime = timings.getLong("dns");
        connectTime = timings.getLong("connect");
        blockedTime = timings.getLong("blocked");
        sendTime = timings.getLong("send");
        waitTime = timings.getLong("wait");
        receiveTime = timings.getLong("receive");
    }

    public String getMethod() {
        return method;
    }

    public String getUrl() {
        return url;
    }

    public String getProtocol() {
        return protocol;
    }

    public String getHost() {
        return host;
    }

    public String getDomain() {
        return domain;
    }

    public String getPath() {
        return path;
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

    public int getStatusCode() {
        return statusCode;
    }

    public int getBytes() {
        return bytes;
    }

    public long getDnsLookupTime() {
        return dnsLookupTime;
    }

    public long getConnectTime() {
        return connectTime;
    }

    public long getBlockedTime() {
        return blockedTime;
    }

    public long getSendTime() {
        return sendTime;
    }

    public long getWaitTime() {
        return waitTime;
    }

    public long getReceiveTime() {
        return receiveTime;
    }

    public String getPartialUrlMd5() {
        return partialUrlMd5;
    }
}
