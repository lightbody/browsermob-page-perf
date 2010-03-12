package com.browsermob.pageperf.server;

import com.browsermob.pageperf.server.util.DateParser;
import org.junit.Test;

import java.util.Date;

import static junit.framework.Assert.assertNotNull;

public class DateParserTest {
    @Test
    public void testParse() throws Exception {
        Date date = DateParser.parse("2010-03-08T18:53:31.151-08:00");
        assertNotNull(date);
    }
}
