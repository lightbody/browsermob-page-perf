package com.browsermob.pageperf.server.servlet;

import com.browsermob.pageperf.server.AbstractEntry;
import com.browsermob.pageperf.server.DataStore;
import com.browsermob.pageperf.server.Rollup;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.codehaus.jackson.map.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Singleton
public class ChartServlet extends HttpServlet {
    private DataStore dataStore;
    private ObjectMapper objectMapper;

    @Inject
    public ChartServlet(DataStore dataStore, ObjectMapper objectMapper) {
        this.dataStore = dataStore;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String testId = req.getParameter("testId");
        ChartType type = ChartType.valueOf(req.getParameter("type"));
        Rollup rollup = Rollup.valueOf(req.getParameter("rollup"));

        int jsOffset = Integer.parseInt(req.getParameter("timeZoneOffset"));
        TimeZone timeZone = TimeZone.getTimeZone(TimeZone.getAvailableIDs(-60 * 1000 * jsOffset)[0]);

        Calendar start = Calendar.getInstance(timeZone);
        start.setTime(new Date(Long.parseLong(req.getParameter("start"))));
        Calendar end = Calendar.getInstance(timeZone);
        end.setTime(new Date(Long.parseLong(req.getParameter("end"))));

        List<? extends AbstractEntry> entries = dataStore.getChartData(type.getMetric(), testId, start, end, rollup);

        objectMapper.writeValue(resp.getOutputStream(), entries);
    }
}
