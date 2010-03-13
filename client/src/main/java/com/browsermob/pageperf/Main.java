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
            FirefoxDriver driver = new PagePerfFirefoxDriver("google4", "http://localhost:8080");
            try {
                driver.get("http://google.com");
                driver.findElement(By.name("q")).sendKeys("Selenium");
                driver.findElement(By.name("btnG")).click();

                WebDriverWait wait = new WebDriverWait(driver, 30);
                WebElement element = wait.until(new ExpectedCondition<WebElement>() {
                    @Override
                    public WebElement apply(WebDriver webDriver) {
                        return webDriver.findElement(By.xpath("//a[@class = 'l' and @href = 'http://seleniumhq.org/']"));
                    }
                });
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                driver.close();
            }

            //Thread.sleep(30000);
        }

    }
}
