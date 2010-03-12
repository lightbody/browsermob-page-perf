package com.browsermob.pageperf.server.guice;

import com.browsermob.pageperf.server.DataSourceProvider;
import com.google.inject.Binder;
import com.google.inject.Module;

import javax.sql.DataSource;

public class PagePerfModule implements Module {
    @Override
    public void configure(Binder binder) {
        binder.bind(DataSource.class).toProvider(DataSourceProvider.class);
    }
}