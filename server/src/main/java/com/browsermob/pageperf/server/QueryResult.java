package com.browsermob.pageperf.server;

import java.util.List;

public class QueryResult {
    private List<String> columns;
    private List<List<String>> rows;

    public QueryResult(List<String> columns, List<List<String>> rows) {
        this.columns = columns;
        this.rows = rows;
    }

    public List<String> getColumns() {
        return columns;
    }

    public List<List<String>> getRows() {
        return rows;
    }
}
