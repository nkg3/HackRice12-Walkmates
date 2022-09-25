package com.example.android;

import android.content.Context;
import android.webkit.JavascriptInterface;

public class WebAppInterface {
    Context mContext;
    private String id = "DEFAULT";

    /**
     * Instantiate the interface and set the context
     */
    WebAppInterface(Context c) {
        mContext = c;
    }

    /**
     * Show a toast from the web page
     */
    @JavascriptInterface
    public String passUserID(String id) {
        this.id = id;
        return this.id;
    }

    public String getID() {
        return id;
    }
}
