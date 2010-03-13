package com.browsermob.pageperf.server;

import com.browsermob.pageperf.server.util.DateParser;
import com.browsermob.pageperf.util.IOUtils;
import com.browsermob.pageperf.util.URLUtils;
import org.codehaus.jackson.JsonNode;
import org.json.JSONException;

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

    public Entry(JsonNode json) throws ParseException, JSONException, MalformedURLException {
        start = DateParser.parse(json.get("startedDateTime").getTextValue());
        timeActive = json.get("time").getLongValue();
        end = new Date(start.getTime() + timeActive);

        JsonNode req = json.get("request");
        method = req.get("method").getTextValue();
        url = req.get("url").getTextValue();
        URL urlObj = new URL(url);
        protocol = urlObj.getProtocol();
        host = urlObj.getHost();
        domain = URLUtils.getDomain(host);
        path = urlObj.getPath();

        try {
            String partial = method + " " + protocol + "://" + host + "/" + path;
            partialUrlMd5 = IOUtils.md5(partial);
        } catch (Exception e) {
            partialUrlMd5 = "error_computing";
        }

        JsonNode res = json.get("response");
        statusCode = res.get("status").getIntValue();
        bytes = res.get("bodySize").getIntValue();

        JsonNode timings = json.get("timings");
        dnsLookupTime = timings.get("dns").getLongValue();
        connectTime = timings.get("connect").getLongValue();
        blockedTime = timings.get("blocked").getLongValue();
        sendTime = timings.get("send").getLongValue();
        waitTime = timings.get("wait").getLongValue();
        receiveTime = timings.get("receive").getLongValue();
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
