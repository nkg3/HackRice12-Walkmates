package com.example.android;

import static android.content.ContentValues.TAG;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.util.Log;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Query;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends AppCompatActivity{

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Bundle extras = getIntent().getExtras();
        String uuid = (String) extras.get("uuid");
        setContentView(R.layout.activity_main);

        uuid = "ZQCDxA743QT3WB4ZWCRDZuywB253";  // TODO: DELETE!!!!
        String docID = getDocID(uuid);
        WebView myWebView = (WebView) findViewById(R.id.webview);
        WebAppInterface webAppInterface = new WebAppInterface(this);
        myWebView.addJavascriptInterface(webAppInterface, "PassID");
        myWebView.loadUrl("https://hackrice12-walkshare.web.app/");
        WebSettings webSettings = myWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);


//        LocationManager locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);
//        TextView lat = findViewById(R.id.lat);
////        TextView lon = findViewById(R.id.lon);
////        lon.setText(token);
//
////        lat.setText(docID);
//        if(
//                ContextCompat.checkSelfPermission(MainActivity.this,
//                        Manifest.permission.ACCESS_COARSE_LOCATION) !=
//                        PackageManager.PERMISSION_GRANTED &&
//                        ContextCompat.checkSelfPermission(MainActivity.this,
//                                Manifest.permission.ACCESS_FINE_LOCATION) !=
//                                PackageManager.PERMISSION_GRANTED){
//
//            ActivityCompat.requestPermissions(MainActivity.this,
//                    new String[]{Manifest.permission.ACCESS_COARSE_LOCATION,
//                            Manifest.permission.ACCESS_FINE_LOCATION}, 1);
//        }
//
//        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 10, 1, new LocationListener() {
//            @Override
//            public void onLocationChanged(@NonNull Location location) {
////                lon.setText(String.valueOf(location.getLongitude()));
////                lat.setText(String.valueOf(location.getLatitude()));
//            }
//        });
    }

    private String getDocID(String uuid) {
        FirebaseFirestore db = FirebaseFirestore.getInstance();
//        final String[] docId = new String[1];
        db.collection("users").whereEqualTo("uuid", uuid).get().addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
            @Override
            public void onComplete(@NonNull Task<QuerySnapshot> task) {
                if (task.isSuccessful()) {
                    String docId = "default";
                    for (QueryDocumentSnapshot document : task.getResult()) {
                        Log.d(TAG, document.getId() + " => " + document.getData());
                        TextView lat = findViewById(R.id.lat);
                        lat.setText(document.getId());
                        docId = document.getId();
                    }

                    LocationManager locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);

                    if(
                        ContextCompat.checkSelfPermission(MainActivity.this,
                            Manifest.permission.ACCESS_COARSE_LOCATION) !=
                            PackageManager.PERMISSION_GRANTED &&
                            ContextCompat.checkSelfPermission(MainActivity.this,
                            Manifest.permission.ACCESS_FINE_LOCATION) !=
                            PackageManager.PERMISSION_GRANTED){

                        ActivityCompat.requestPermissions(MainActivity.this,
                                new String[]{Manifest.permission.ACCESS_COARSE_LOCATION,
                                        Manifest.permission.ACCESS_FINE_LOCATION}, 1);
                    }

                    String finalDocId = docId;
                    locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 10, 1, new LocationListener() {
                        @Override
                        public void onLocationChanged(@NonNull Location location) {
                            DocumentReference userRef = db.collection("users").document(finalDocId);
                            userRef
                                    .update("location", Arrays.asList(location.getLatitude(), location.getLongitude()))
                                    .addOnSuccessListener(new OnSuccessListener<Void>() {
                                        @Override
                                        public void onSuccess(Void aVoid) {
                                            Log.d(TAG, "DocumentSnapshot successfully updated!");
                                        }
                                    })
                                    .addOnFailureListener(new OnFailureListener() {
                                        @Override
                                        public void onFailure(@NonNull Exception e) {
                                            Log.w(TAG, "Error updating document", e);
                                        }
                                    });
                        }
                    });

                } else {
                    Log.d(TAG, "Error getting documents: ", task.getException());
                }
            }
        });

        return "test";
    }

}
