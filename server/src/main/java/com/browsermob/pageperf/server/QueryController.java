package com.browsermob.pageperf.server;

import com.google.inject.Inject;
import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;

@RemoteProxy
public class QueryController {
    private DataStore dataStore;

    @Inject
    public QueryController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @RemoteMethod
    public AddResult add(int x, int y) {
        return new AddResult(x, y);
    }
}
