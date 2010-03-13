package com.browsermob.pageperf.server;

import java.util.Date;
import java.util.TimeZone;

public abstract class AbstractEntry {
    protected Date date;

    public AbstractEntry(Date date) {
        this.date = date;
    }

    public Date getDate() {
        return date;
    }

    public void adjustForTimeZone(TimeZone tz) {
        date = new Date(date.getTime() + tz.getRawOffset());
    }
}
