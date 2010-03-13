package com.browsermob.pageperf.server;

import java.util.Date;

public class ResponseTimeEntry extends AbstractEntry {
    private long responseTime;
    private long id;
    private Long minResponseTime;
    private Long maxResponseTime;

    public ResponseTimeEntry(Date date, long responseTime) {
        super(date);
        this.responseTime = responseTime;
    }

    public long getResponseTime() {
        return responseTime;
    }

    public void setResponseTime(long responseTime) {
        this.responseTime = responseTime;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Long getMinResponseTime() {
        return minResponseTime;
    }

    public void setMinResponseTime(Long minResponseTime) {
        this.minResponseTime = minResponseTime;
    }

    public Long getMaxResponseTime() {
        return maxResponseTime;
    }

    public void setMaxResponseTime(Long maxResponseTime) {
        this.maxResponseTime = maxResponseTime;
    }
}
