package com.browsermob.pageperf.server.guice;

import com.browsermob.pageperf.server.AddResult;
import com.browsermob.pageperf.server.QueryController;
import org.directwebremoting.guice.AbstractDwrModule;
import org.directwebremoting.guice.DwrGuiceServlet;
import org.directwebremoting.guice.DwrScopes;
import org.directwebremoting.guice.ParamName;

public class DwrModule extends AbstractDwrModule {
    
    @Override
    protected void configure() {
        bind(DwrGuiceServlet.class).asEagerSingleton();


        bindRemoted(QueryController.class).to(QueryController.class).in(DwrScopes.APPLICATION);
        bindAnnotatedClasses(AddResult.class);

        bindParameter(ParamName.DEBUG).to(true);
        bindParameter(ParamName.ACTIVE_REVERSE_AJAX_ENABLED).to(true);
        bindParameter(ParamName.MAX_WAIT_AFTER_WRITE).to(10000L);

        bindDwrScopes(false);
    }
}
