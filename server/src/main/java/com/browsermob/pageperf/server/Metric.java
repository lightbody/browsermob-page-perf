package com.browsermob.pageperf.server;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.TimeZone;

public interface Metric<T extends AbstractEntry> {
    public final static ResponseTimeMetric ResponseTime = new ResponseTimeMetric();

    public String sql(Rollup rollup);

    public T parse(ResultSet rs, Rollup rollup, TimeZone timeZone) throws SQLException;

}
