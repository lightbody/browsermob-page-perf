package com.browsermob.pageperf.server.servlet;

import com.browsermob.pageperf.server.DataStore;
import com.browsermob.pageperf.server.Session;
import com.browsermob.pageperf.util.Log;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.SQLException;
import java.text.ParseException;

@Singleton
public class HarServlet extends HttpServlet {
    private static final Log LOG = new Log();

    private DataStore dataStore;

    @Inject
    public HarServlet(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String testId = req.getParameter("testId");
        if (testId == null) {
            resp.sendError(500, "testId must be provided");
            return;
        }

        long sessionId = -1;
        try {
            String sidStr = req.getParameter("sessionId");
            if (sidStr != null) {
                sessionId = Long.parseLong(sidStr);
            }
        } catch (NumberFormatException e) {
            resp.sendError(500, "Invalid session ID");
            return;
        }

        try {

            JSONObject json = new JSONObject(new JSONTokener(new InputStreamReader(req.getInputStream())));

            sessionId = dataStore.save(testId, sessionId, json);
        } catch (Exception e) {
            resp.sendError(500, e.getMessage());
            LOG.severe("Could not save session", e);
        }

        ServletOutputStream os = resp.getOutputStream();
        os.print(sessionId);
        os.close();
    }
}
