package com.browsermob.pageperf.server.servlet;

import com.browsermob.pageperf.server.DataStore;
import com.google.inject.Inject;
import com.google.inject.Singleton;
import org.codehaus.jackson.map.ObjectMapper;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Singleton
public class QueryServlet extends HttpServlet {
    private DataStore dataStore;

    @Inject
    public QueryServlet(DataStore dataStore) {
        this.dataStore = dataStore;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        ObjectMapper mapper = new ObjectMapper(); // can reuse, share globally
//        User user = mapper.readValue(new File("user.json"), User.class);

        super.doGet(req, resp);
    }
}
