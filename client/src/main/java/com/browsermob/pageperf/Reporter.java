package com.browsermob.pageperf;

import com.browsermob.pageperf.util.IOUtils;
import com.browsermob.pageperf.util.Log;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.FileEntity;
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
        process("foo", "http://localhost:8080", new File("client/test-data"));
    }

    static void process(String testId, String server, File dir) {

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

        LOG.info("Going to process " + files.length + " files:");

        // list out the files!
        long sessionId = -1;
        for (File file : files) {
            LOG.info("Processing %s", file);
            
            HttpClient client = new DefaultHttpClient();
            HttpPost post = new HttpPost(server + "/har?testId=" + testId + "&sessionId=" + sessionId);
            post.setEntity(new FileEntity(file, "text/json"));

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
