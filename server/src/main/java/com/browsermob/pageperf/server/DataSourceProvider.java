package com.browsermob.pageperf.server;

import com.browsermob.pageperf.server.util.DataDir;
import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.inject.Singleton;
import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.h2.tools.Server;

import javax.sql.DataSource;
import java.beans.PropertyVetoException;
import java.io.File;

@Singleton
public class DataSourceProvider implements Provider<DataSource> {
    private File dataDir;
    private ComboPooledDataSource dataSource;

    @Inject
    public DataSourceProvider(@DataDir File dataDir) {
        this.dataDir = dataDir;
    }

    @Override
    public DataSource get() {
        if (dataSource == null) {
            dataDir.mkdirs();
            dataSource = new ComboPooledDataSource();
            try {
                dataSource.setDriverClass("org.h2.Driver");
                dataSource.setJdbcUrl("jdbc:h2:" + dataDir.getAbsolutePath() + "/database");
                dataSource.setUser("sa");
            } catch (PropertyVetoException e) {
                e.printStackTrace();
            }
        }

        return dataSource;
    }
}
