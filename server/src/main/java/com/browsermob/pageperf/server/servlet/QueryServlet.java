package com.browsermob.pageperf.server.servlet;

import com.browsermob.pageperf.server.DataStore;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.codehaus.jackson.map.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Singleton
public class QueryServlet extends HttpServlet {
    private DataStore dataStore;
    private ObjectMapper objectMapper;

    @Inject
    public QueryServlet(DataStore dataStore, ObjectMapper objectMapper) {
        this.dataStore = dataStore;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String testId = req.getParameter("testId");
        QueryType type = QueryType.valueOf(req.getParameter("type"));

        Object ret = null;

        switch (type) {
            case SESSION:
                ret = dataStore.querySession(testId);
                break;
            default:
                throw new RuntimeException("Ack!");
        }

        objectMapper.writeValue(resp.getOutputStream(), ret);
    }
}
