package com.browsermob.pageperf;

import com.browsermob.pageperf.util.IOUtils;
import com.browsermob.pageperf.util.Log;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.io.*;
import java.util.Arrays;
import java.util.Comparator;

public class Reporter {
    private static final Log LOG = new Log();

    public static void main(String[] args) {
        process("foo", new File("/Users/plightbo/Desktop/Blah"));
    }

    static void process(String testId, File dir) {

        // get all .har files
        File[] files = dir.listFiles(new FilenameFilter() {
            @Override
            public boolean accept(File dir, String name) {
                return name.endsWith(".har");
            }
        });

        // sort by last modified date
        Arrays.sort(files, new Comparator<File>() {
            @Override
            public int compare(File f1, File f2) {
                return new Long(f1.lastModified()).compareTo(f2.lastModified());
            }
        });

        // list out the files!
        long sessionId = -1;
        for (File file : files) {
            LOG.info("Processing %s", file);
            
            FileReader reader;
            try {
                reader = new FileReader(file);
            } catch (FileNotFoundException e) {
                LOG.severe("File not found, even though we just listed %s", e, file);
                continue;
            }

            JSONObject json;
            try {
                json = new JSONObject(new JSONTokener(reader));
            } catch (JSONException e) {
                LOG.severe("Could not parse %s", e, file);
                continue;
            }

            HttpClient client = new DefaultHttpClient();
            HttpPost post = new HttpPost("http://localhost:8080/har?testId=" + testId + "&sessionId=" + sessionId);
            try {
                post.setEntity(new StringEntity(json.toString()));
            } catch (UnsupportedEncodingException e) {
                LOG.severe("Unsupported encoding shouldn't happen, but it is for file %s", e, file);
                continue;
            }

            try {
                HttpResponse res = client.execute(post);
                if (res.getStatusLine().getStatusCode() != 200) {
                    LOG.severe("Could not submit HAR file %s", file);
                    continue;
                }

                sessionId = Long.parseLong(IOUtils.readFully(res.getEntity().getContent()));
            } catch (IOException e) {
                LOG.severe("Unable to post HAR file %s", e, file);
            }
        }
    }

}
