To get started, execute run.sh or run.bat and visit:

    http://localhost:8080

Once you've confirmed the server is running, you can then write
a Selenium WebDriver test (using 2.0 alpha 3 or later) with code
such as this:

    import com.browsermob.pageperf.PagePerfFirefoxDriver;
    ...
    String testId = "My First Test";
    String url = "http://localhost:8080";
    FirefoxDriver driver = new PagePerfFirefoxDriver(testId, url);
    driver.get("http://browsermob.com");
    driver.close();

This will use Selenium WebDriver to visit browsermob.com. Upon
closing the driver, the network performance of every request
observed by Firebug will be reported to the running server. You
can then visit http://localhost:8080 and you should see an entry
for "My First Test". Each time this test runs, new data points
will be added to the and charted.