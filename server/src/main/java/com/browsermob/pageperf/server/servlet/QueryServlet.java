package com.browsermob.pageperf.server.servlet;

import com.browsermob.pageperf.server.DataStore;
import com.browsermob.pageperf.server.QueryResult;
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
    private ObjectMapper objectMapper;
    private DataStore dataStore;

    @Inject
    public QueryServlet(ObjectMapper objectMapper, DataStore dataStore) {
        this.objectMapper = objectMapper;
        this.dataStore = dataStore;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/WEB-INF/jsp/query.jsp").include(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String query = req.getParameter("query");
        QueryResult result = dataStore.query(query);
        objectMapper.writeValue(resp.getOutputStream(), result);
    }
}
