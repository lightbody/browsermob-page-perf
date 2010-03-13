package com.browsermob.pageperf.server.guice;

import com.browsermob.pageperf.server.servlet.*;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;
import com.google.inject.servlet.ServletModule;

import javax.servlet.ServletContextEvent;

public class PagePerfGuiceServletConfig extends GuiceServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent event) {
        super.contextInitialized(event);
    }

    @Override
    protected Injector getInjector() {
        return Guice.createInjector(new ServletModule() {
            @Override
            protected void configureServlets() {
                serve("/har", "/har/*").with(HarServlet.class);
                serve("/tests", "/tests/*").with(TestsServlet.class);
                serve("/chart").with(ChartServlet.class);
                serve("/session/*").with(SessionServlet.class);
                serve("/query").with(QueryServlet.class);
            }
        }, new PagePerfModule());
    }
}
