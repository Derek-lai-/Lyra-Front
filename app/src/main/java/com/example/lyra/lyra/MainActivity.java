package com.example.lyra.lyra;

import android.app.Activity;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;


public class MainActivity extends Activity{

    private static final int REQUEST_IMAGE_CAPTURE = 100;

    private Uri fileUri;
    private String currentPhotoPath;

    private Button camera;
    private Button playSong;
    private Button pauseSong;
    private Button songLib;
    private Button upload;

    private ImageView photoImage;
    private Bitmap imageBitmap;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        camera = (Button) findViewById(R.id.capture);

        camera.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                CameraActivity.cameraAct();
            }
        });
    }

}
