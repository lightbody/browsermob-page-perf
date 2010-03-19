package com.browsermob.pageperf.server.servlet;

import com.browsermob.pageperf.server.AbstractEntry;
import com.browsermob.pageperf.server.Metric;

public enum ChartType {
    RESPONSE_TIME(Metric.ResponseTime),
    OBJECT_RESPONSE_TIME(Metric.ObjectResponseTime);

    private Metric<? extends AbstractEntry> metric;

    ChartType(Metric<? extends AbstractEntry> metric) {
        this.metric = metric;
    }

    public Metric<? extends AbstractEntry> getMetric() {
        return metric;
    }
}
