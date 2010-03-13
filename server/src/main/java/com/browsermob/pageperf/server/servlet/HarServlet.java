package com.browsermob.pageperf.server.servlet;

import com.browsermob.pageperf.server.DataStore;
import com.browsermob.pageperf.util.Log;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Singleton
public class HarServlet extends HttpServlet {
    private static final Log LOG = new Log();

    private DataStore dataStore;

    @Inject
    public HarServlet(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        if (pathInfo == null || req.getPathInfo().equals("/")) {
            resp.sendError(500, "GET must include session ID");
            return;
        }

        long sessionId = Long.parseLong(pathInfo.substring(1));

        dataStore.writeSessionHar(sessionId, resp.getOutputStream());
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

            ObjectMapper mapper = new ObjectMapper();
            JsonNode json = mapper.readValue(req.getInputStream(), JsonNode.class);

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
