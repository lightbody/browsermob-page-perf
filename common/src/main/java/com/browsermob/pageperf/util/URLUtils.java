package com.browsermob.pageperf.util;

import java.util.Arrays;
import java.util.List;

public class URLUtils {
    public static String getDomain(String url) {
        String host;
        String domain;
        domain = host = url;

        List<String> chunks = Arrays.asList(host.split("\\."));
        if(chunks.size() > 2) {
            domain = chunks.get(chunks.size() - 1);
            for(int i = (chunks.size() - 2); i >= 0; i--) {
                String chunk = chunks.get(i);
                domain = chunk + "." + domain;

                if((chunk.length() > 2) && (!chunk.equals("com") || !chunk.equals("edu"))) {
                    break;
                }
            }
        }
        return domain;
    }
}
