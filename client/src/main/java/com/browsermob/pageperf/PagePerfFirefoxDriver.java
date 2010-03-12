package com.browsermob.pageperf;

import org.openqa.selenium.firefox.ExtensionConnection;
import org.openqa.selenium.firefox.FirefoxBinary;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxProfile;

import java.io.File;
import java.io.IOException;

public class PagePerfFirefoxDriver extends FirefoxDriver {
    private FirefoxProfile profile;
    private String testId;

    public PagePerfFirefoxDriver(String testId) {
        this(testId, null);
    }

    public PagePerfFirefoxDriver(String testId, FirefoxBinary binary) {
        super(binary, makeProfile());
        this.testId = testId;
    }

    @Override
    protected ExtensionConnection connectTo(FirefoxBinary binary, FirefoxProfile profile, String host) {
        this.profile = profile;
        return super.connectTo(binary, profile, host);
    }

    private static FirefoxProfile makeProfile() {
        FirefoxProfile profile = new FirefoxProfile();
        try {
            profile.addExtension(FirefoxProfile.class, "firebug-1.6X.0a7.xpi");
            profile.addExtension(FirefoxProfile.class, "netExport-0.7b13-mob.xpi");
            profile.addExtension(FirefoxProfile.class, "yslow-2.0.7-fx.xpi");
            profile.addExtension(FirefoxProfile.class, "fireStarter-0.1.a5.xpi");
        } catch (IOException e) {
            throw new RuntimeException("Could not load required extensions, something is worng", e);
        }

        profile.setPreference("extensions.firebug.netexport.autoExportActive", true);
        //profile.setPreference("extensions.firebug.netexport.defaultLogDir", dir.getAbsolutePath());
        profile.setPreference("extensions.firebug.DBG_NETEXPORT", true);
        profile.setPreference("extensions.firebug.onByDefault", true);
        profile.setPreference("extensions.firebug.defaultPanelName", "net");
        profile.setPreference("extensions.firebug.net.enableSites", true);
        profile.setPreference("extensions.firebug.previousPlacement", 1);

        return profile;
    }

    @Override
    public void close() {
        // go to example.com to force the page unload
        get("http://example.com");

        // chill for a sec
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // go ahead and close it
        super.close();

        File logDir = new File(profile.getProfileDir(), "firebug/netexport/logs");
        Reporter.process(testId, logDir);
    }
}
