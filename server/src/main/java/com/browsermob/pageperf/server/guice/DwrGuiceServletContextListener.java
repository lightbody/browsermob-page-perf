package com.browsermob.pageperf.server.guice;

import com.google.inject.Injector;
import org.directwebremoting.guice.CustomInjectorServletContextListener;

import javax.servlet.ServletContextEvent;

public class DwrGuiceServletContextListener extends CustomInjectorServletContextListener {
    private Injector injector;

    @Override
    public void contextInitialized(ServletContextEvent event) {
        injector = (Injector) event.getServletContext().getAttribute(Injector.class.getName());
        super.contextInitialized(event);
    }

    @Override
    protected Injector createInjector() {
        return injector;
    }
}
