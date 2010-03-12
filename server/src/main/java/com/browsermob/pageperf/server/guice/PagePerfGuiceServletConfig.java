package com.browsermob.pageperf.server.guice;

import com.browsermob.pageperf.server.servlet.HarServlet;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.servlet.GuiceServletContextListener;
import com.google.inject.servlet.ServletModule;
import org.directwebremoting.guice.DwrGuiceServlet;

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
                serve("/har").with(HarServlet.class);
                serve("/dwr/*").with(DwrGuiceServlet.class);
            }
        }, new PagePerfModule(), new DwrModule());
    }
}
