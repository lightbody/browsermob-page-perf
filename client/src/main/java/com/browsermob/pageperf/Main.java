package com.browsermob.pageperf;

import org.openqa.selenium.firefox.FirefoxDriver;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        FirefoxDriver driver = new PagePerfFirefoxDriver("foo");
        driver.get("http://cnn.com");
        driver.get("http://yahoo.com");
        driver.close();
    }
}
