package com.browsermob.pageperf;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        while(true) {
            FirefoxDriver driver = new PagePerfFirefoxDriver("TechCrunch", "http://localhost:8080");
            try {
                driver.get("http://techcrunch.com/");
                sleep();

                driver.get("http://techcrunch.com/2010/03/19/google-speed-search-more/");
                sleep();

                driver.findElementByLinkText("Enterprise").click();
                sleep();

            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                driver.close();
            }

            Thread.sleep(30000);
        }

    }

    private static void sleep() {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
