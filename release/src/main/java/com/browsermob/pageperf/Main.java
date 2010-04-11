package com.browsermob.pageperf;

import org.mortbay.jetty.Server;
import org.mortbay.jetty.webapp.WebAppContext;

import java.io.File;
import java.io.FilenameFilter;

public class Main {
    public static void main(String[] args) throws Exception {
        Server server = new Server(8080);

        String path;
        File[] files = new File(".").listFiles(new FilenameFilter() {
            @Override
            public boolean accept(File dir, String name) {
                return name.endsWith(".war");
            }
        });

        if (files.length > 0) {
            path = files[0].getPath();
        } else if (new File("server/src/main/webapp").exists()) {
            path = "server/src/main/webapp";
        } else if (new File("../server/src/main/webapp").exists()) {
            path = "../server/src/main/webapp";
        } else if (new File("src/main/webapp").exists()) {
            path = "src/main/webapp";
        } else {
            System.err.println("CRITICAL ERROR: Could not find server web application.");
            return;
        }

        server.addHandler(new WebAppContext(path, "/"));
        server.start();
    }
    
}
