package com.browsermob.pageperf.server;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

public class ResponseTimeMetric implements Metric<ResponseTimeEntry> {
    ResponseTimeMetric() {
    }

    @Override
    public String sql(Rollup rollup) {
        switch (rollup) {
            case NONE:
                return "SELECT session_id, time_active, start_time FROM session WHERE test_id = ? AND start_time BETWEEN ? AND ? ORDER BY start_time DESC";
            case DAY:
                return "SELECT YEAR(start_time) as year, MONTH(start_time) as month, DAY(start_time) as day, 0                as hour, AVG(time_active) as time_active, MIN(time_active) as min, MAX(time_active) as max FROM session WHERE test_id = ? AND start_time BETWEEN ? AND ? GROUP BY YEAR(start_time),MONTH(start_time),DAY(start_time) ORDER BY YEAR(start_time) DESC, MONTH(start_time) DESC, DAY(start_time) DESC";
            case HOUR:
                return "SELECT YEAR(start_time) as year, MONTH(start_time) as month, DAY(start_time) as day, HOUR(start_time) as hour, AVG(time_active) as time_active, MIN(time_active) as min, MAX(time_active) as max FROM session WHERE test_id = ? AND start_time BETWEEN ? AND ? GROUP BY YEAR(start_time),MONTH(start_time),DAY(start_time),HOUR(start_time) ORDER BY YEAR(start_time) DESC, MONTH(start_time) DESC, DAY(start_time) DESC, HOUR(start_time) DESC";
        }

        throw new RuntimeException("Invalid rollup");
    }

    @Override
    public ResponseTimeEntry parse(ResultSet rs, Rollup rollup, TimeZone timeZone) throws SQLException {
        Long responseTime = rs.getLong("time_active");

        ResponseTimeEntry r;

        if (rollup == Rollup.NONE) {
            Calendar srcCal = Calendar.getInstance();
            Calendar targetCal = Calendar.getInstance(timeZone);

            srcCal.setTime(new Date(rs.getTimestamp("start_time").getTime()));
            targetCal.set(srcCal.get(Calendar.YEAR),
                    srcCal.get(Calendar.MONTH),
                    srcCal.get(Calendar.DAY_OF_MONTH),
                    srcCal.get(Calendar.HOUR_OF_DAY),
                    srcCal.get(Calendar.MINUTE),
                    srcCal.get(Calendar.SECOND));

            r = new ResponseTimeEntry(targetCal.getTime(), responseTime);
            r.setId(rs.getLong("session_id"));
        } else {
            Calendar cal = Calendar.getInstance(timeZone);
            cal.set(Calendar.MINUTE, 0);
            cal.set(Calendar.SECOND, 0);
            cal.set(Calendar.MILLISECOND, 0);

            cal.set(Calendar.YEAR, rs.getInt("year"));
            cal.set(Calendar.MONTH, rs.getInt("month") - 1);
            cal.set(Calendar.DAY_OF_MONTH, rs.getInt("day"));
            cal.set(Calendar.HOUR_OF_DAY, rs.getInt("hour"));

            r = new ResponseTimeEntry(cal.getTime(), responseTime);
            r.setMinResponseTime(rs.getLong("min"));
            r.setMaxResponseTime(rs.getLong("max"));
        }

        return r;
    }
}
