package com.browsermob.pageperf.server.servlet;

import com.browsermob.pageperf.server.DataStore;
import com.google.inject.Inject;
import com.google.inject.Singleton;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Singleton
public class TestsServlet extends HttpServlet {
    private DataStore dataStore;

    @Inject
    public TestsServlet(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        if (pathInfo == null) {
            List<String> testIds = dataStore.getKnownTests();
            req.setAttribute("testIds", testIds);
            req.getRequestDispatcher("/WEB-INF/jsp/testList.jsp").include(req, resp);
        } else {
            String path = pathInfo.substring(1);
            int slash = path.indexOf('/');
            if (slash == -1) {
                req.setAttribute("testId", path);
                req.getRequestDispatcher("/WEB-INF/jsp/viewTest.jsp").include(req, resp);
            } else {
                String testId = path.substring(0, slash);
                String md5 = path.substring(slash + 1);
                req.setAttribute("testId", testId);
                req.setAttribute("md5", md5);
                req.getRequestDispatcher("/WEB-INF/jsp/viewObject.jsp").include(req, resp);
            }
        }
    }
}
