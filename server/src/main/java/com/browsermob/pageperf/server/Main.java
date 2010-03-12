package com.browsermob.pageperf.server;

import org.mortbay.jetty.Server;
import org.mortbay.jetty.webapp.WebAppContext;

public class Main {
    public static void main(String[] args) throws Exception {
        Server server = new Server(8080);

        server.addHandler(new WebAppContext("server/src/main/webapp", "/"));
        server.start();
    }
}
