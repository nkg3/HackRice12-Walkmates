package com.example.android;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

public class AfterActivity extends AppCompatActivity{

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Bundle extras = getIntent().getExtras();
        String token = (String) extras.get("token");
        setContentView(R.layout.activity_main);

        WebView myWebView = (WebView) findViewById(R.id.webview);
        WebAppInterface webAppInterface = new WebAppInterface(this);
        myWebView.addJavascriptInterface(webAppInterface, "PassID");
        myWebView.loadUrl("https://hackrice12-walkshare.web.app/");
        WebSettings webSettings = myWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);


        LocationManager locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);
        TextView lat = findViewById(R.id.lat);
//        TextView lon = findViewById(R.id.lon);
//        lon.setText(token);
        lat.setText(token);
        if(
                ContextCompat.checkSelfPermission(AfterActivity.this,
                        Manifest.permission.ACCESS_COARSE_LOCATION) !=
                        PackageManager.PERMISSION_GRANTED &&
                        ContextCompat.checkSelfPermission(AfterActivity.this,
                                Manifest.permission.ACCESS_FINE_LOCATION) !=
                                PackageManager.PERMISSION_GRANTED){

            ActivityCompat.requestPermissions(AfterActivity.this,
                    new String[]{Manifest.permission.ACCESS_COARSE_LOCATION,
                            Manifest.permission.ACCESS_FINE_LOCATION}, 1);
        }

        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 10, 1, new LocationListener() {
            @Override
            public void onLocationChanged(@NonNull Location location) {
//                lon.setText(String.valueOf(location.getLongitude()));
//                lat.setText(String.valueOf(location.getLatitude()));
            }
        });
    }

}
