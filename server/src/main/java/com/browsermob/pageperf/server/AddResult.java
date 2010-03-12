package com.browsermob.pageperf.server;

public class AddResult {
    private int x;
    private int y;
    private int result;

    public AddResult() {
    }

    public AddResult(int x, int y) {
        this.x = x;
        this.y = y;
        this.result = x + y;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public int getResult() {
        return result;
    }
}
