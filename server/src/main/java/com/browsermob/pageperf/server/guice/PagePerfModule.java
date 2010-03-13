package com.browsermob.pageperf.server.guice;

import com.browsermob.pageperf.server.DataSourceProvider;
import com.browsermob.pageperf.server.util.DataDir;
import com.google.inject.Binder;
import com.google.inject.Module;
import org.codehaus.jackson.map.ObjectMapper;

import javax.sql.DataSource;
import java.io.File;

public class PagePerfModule implements Module {
    @Override
    public void configure(Binder binder) {
        binder.bind(DataSource.class).toProvider(DataSourceProvider.class);
        binder.bind(File.class).annotatedWith(DataDir.class).toInstance(new File("data")); // todo
        binder.bind(ObjectMapper.class).asEagerSingleton();
    }
}