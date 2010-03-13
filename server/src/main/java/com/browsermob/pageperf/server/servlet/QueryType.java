package com.browsermob.pageperf.server.servlet;

import com.browsermob.pageperf.server.AbstractEntry;
import com.browsermob.pageperf.server.Metric;

public enum QueryType {
    RESPONSE_TIME(Metric.ResponseTime);

    private Metric<? extends AbstractEntry> metric;

    QueryType(Metric<? extends AbstractEntry> metric) {
        this.metric = metric;
    }

    public Metric<? extends AbstractEntry> getMetric() {
        return metric;
    }
}
