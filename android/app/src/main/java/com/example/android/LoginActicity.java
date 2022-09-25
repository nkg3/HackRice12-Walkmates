package com.example.android;

import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;

import com.firebase.ui.auth.AuthUI;
import com.firebase.ui.auth.FirebaseAuthUIActivityResultContract;
import com.firebase.ui.auth.IdpResponse;
import com.firebase.ui.auth.data.model.FirebaseAuthUIAuthenticationResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

import java.util.Collections;


public class LoginActicity extends AppCompatActivity {
    FirebaseUser user;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent signInIntent =
                AuthUI.getInstance()
                        .createSignInIntentBuilder()
                        .setAvailableProviders(Collections.singletonList(new AuthUI.IdpConfig.EmailBuilder().setAllowNewAccounts(false).build()))
                        .build();

        signInLauncher.launch(signInIntent);
//
        String userid;


//        setContentView(R.layout.activity_main);
////        String token = user.getIdToken(false).getResult().getToken();
//        WebView myWebView = (WebView) findViewById(R.id.webview);
//        WebAppInterface webAppInterface = new WebAppInterface(this);
//        myWebView.addJavascriptInterface(webAppInterface, "PassID");
//        myWebView.loadUrl("https://hackrice12-walkshare.web.app/");
//        WebSettings webSettings = myWebView.getSettings();
//        webSettings.setJavaScriptEnabled(true);
//
//
//        userid = webAppInterface.getID();
//        LocationManager locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);
//        TextView lat = findViewById(R.id.lat);
//        TextView lon = findViewById(R.id.lon);
////        lon.setText(token);
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
//                lat.setText(String.valueOf(location.getLatitude()));
//            }
//        });

    }

    private final ActivityResultLauncher<Intent> signInLauncher = registerForActivityResult(
            new FirebaseAuthUIActivityResultContract(),
            new ActivityResultCallback<FirebaseAuthUIAuthenticationResult>() {
                @Override
                public void onActivityResult(FirebaseAuthUIAuthenticationResult result) {
                    onSignInResult(result);
                }

            }
    );

    private void onSignInResult(FirebaseAuthUIAuthenticationResult result) {
        IdpResponse response = result.getIdpResponse();
        if (result.getResultCode() == RESULT_OK) {
            // Successfully signed in
            this.user = FirebaseAuth.getInstance().getCurrentUser();
            Intent intent = new Intent(this, MainActivity.class);
            intent.putExtra("uuid", user.getUid());
            startActivity(intent);
            // ...
        } else {
            // Sign in failed. If response is null the user canceled the
            // sign-in flow using the back button. Otherwise check
            // response.getError().getErrorCode() and handle the error.
            // ...
        }
    }
}

