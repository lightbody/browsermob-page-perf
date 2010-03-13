package com.browsermob.pageperf.server.servlet;

import com.google.inject.Singleton;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Singleton
public class SessionServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        long sessionId = Long.parseLong(pathInfo.substring(1));
//        req.setAttribute("sessionId", sessionId);
//        req.getRequestDispatcher("/WEB-INF/jsp/viewSession.jsp").include(req, resp);
        resp.sendRedirect("/viewer/?path=/har/" + sessionId);
    }
}
