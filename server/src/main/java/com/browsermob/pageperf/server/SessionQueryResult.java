package com.browsermob.pageperf.server;

public class SessionQueryResult {
    private long sessionId;
    private long responseTime;

    public SessionQueryResult() {
    }

    public SessionQueryResult(long sessionId, long responseTime) {
        this.sessionId = sessionId;
        this.responseTime = responseTime;
    }

    public long getSessionId() {
        return sessionId;
    }

    public void setSessionId(long sessionId) {
        this.sessionId = sessionId;
    }

    public long getResponseTime() {
        return responseTime;
    }

    public void setResponseTime(long responseTime) {
        this.responseTime = responseTime;
    }
}
