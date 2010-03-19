package com.browsermob.pageperf.server;

import java.util.Date;

public class ObjectResponseTimeEntry extends ResponseTimeEntry {
    public ObjectResponseTimeEntry(Date date, long responseTime) {
        super(date, responseTime);
    }
}
