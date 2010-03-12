package com.browsermob.pageperf.server.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateParser {
    public static Date parse(String s) throws ParseException {
        if (s.charAt(s.length() - 3) == ':') {
            s = s.substring(0, s.length() - 3) + s.substring(s.length() - 2);
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZZZZ");
        return sdf.parse(s);
    }
}
