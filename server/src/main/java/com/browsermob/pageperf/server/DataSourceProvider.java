package com.browsermob.pageperf.server;

import com.google.inject.Provider;
import com.google.inject.Singleton;
import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.h2.tools.Server;

import javax.sql.DataSource;
import java.beans.PropertyVetoException;

@Singleton
public class DataSourceProvider implements Provider<DataSource> {
    @Override
    public DataSource get() {
        ComboPooledDataSource ds = new ComboPooledDataSource();
        try {
            ds.setDriverClass("org.h2.Driver");
            ds.setJdbcUrl("jdbc:h2:data/database");
            ds.setUser("sa");
        } catch (PropertyVetoException e) {
            e.printStackTrace();
        }

        return ds;
    }
}
