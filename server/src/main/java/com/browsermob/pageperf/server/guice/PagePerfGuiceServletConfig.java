package com.browsermob.pageperf.server.guice;

import com.browsermob.pageperf.server.servlet.ChartServlet;
import com.browsermob.pageperf.server.servlet.HarServlet;
import com.browsermob.pageperf.server.servlet.SessionServlet;
import com.browsermob.pageperf.server.servlet.TestsServlet;
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
            }
        }, new PagePerfModule());
    }
}
