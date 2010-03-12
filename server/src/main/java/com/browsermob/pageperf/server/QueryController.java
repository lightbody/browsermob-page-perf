package com.browsermob.pageperf.server;

import com.google.inject.Inject;

public class QueryController {
    private DataStore dataStore;

    @Inject
    public QueryController(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    public AddResult add(int x, int y) {
        return new AddResult(x, y);
    }
}
