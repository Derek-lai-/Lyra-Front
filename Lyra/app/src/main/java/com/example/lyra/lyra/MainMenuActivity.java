package com.example.lyra.lyra;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import java.net.URI;
import java.net.URISyntaxException;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;

import javax.xml.datatype.Duration;


public class MainMenuActivity extends Activity {
    private static final String TAG = "CallCamera";
    static final int REQUEST_IMAGE_CAPTURE = 1;
    private static final int CAPTURE_IMAGE_ACTIVITY_REQ = 0;
    private WebSocketClient mWebSocketClient;

    private Button camera;
    private Button playSong;
    private Button stopSong;
    private Button btnSongs;

    private SeekBar seekBar;
    private MediaPlayer mediaPlayer;
    private TextView songName;

    private ImageView photoImage;
    private Bitmap imageBitmap;

    private boolean Complete;

    private String currentPhotoPath;

    private Uri fileUri = null;

    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_fullscreen);

        photoImage = (ImageView) findViewById(R.id.photo_img);

        camera = (Button) findViewById(R.id.capture);
        playSong = (Button) findViewById(R.id.btnPlay);
        stopSong = (Button) findViewById(R.id.btnPause);
        btnSongs = (Button) findViewById(R.id.songs);

        seekBar = (SeekBar) findViewById(R.id.seekBar);

        songName = (TextView) findViewById(R.id.songName);

        mediaPlayer = new MediaPlayer();

        mediaPlayer.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
            @Override
            public void onCompletion(MediaPlayer mediaPlayer) {
                Complete = true;
            }
        });

        camera.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                cameraAct();
            }
        });

        btnSongs.setOnClickListener(new View.OnClickListener(){
            public void onClick(View v){
                Intent i = new Intent(MainMenuActivity.this, LibraryActivity.class);
                MainMenuActivity.this.startActivity(i);
            }
        });
    }

    /* ---------------------------------- Photo Act Begins --------------------------------------*/
    private void cameraAct(){
        Intent pictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        // Ensure that there's a camera activity to handle the intent
        if (pictureIntent.resolveActivity(getPackageManager()) != null){
            // Create the File where the photo should go
            File photoFile = null;
            try {
                photoFile = createImageFile();
                currentPhotoPath = photoFile.getAbsolutePath();
                pictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(photoFile));
            } catch (IOException ex) {
                // Error occurred while creating the File
                ex.printStackTrace();
                photoFile = null;
                currentPhotoPath = null;
            }
            // Continue only if the File was successfully created
            if (photoFile != null) {
                startActivityForResult(pictureIntent, REQUEST_IMAGE_CAPTURE);
            }
        }
    }

    private File createImageFile() throws IOException {
        // Create an image file name
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String imageFileName = "IMG_" + timeStamp + "_";
        File storageDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
        File image = File.createTempFile(
                imageFileName, /* prefix */
                ".jpg",        /* suffix */
                storageDir     /* directory */
        );

        return image;
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data){
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            Bundle extras = data.getExtras();
            imageBitmap = (Bitmap) extras.get("data");
            photoImage.setImageBitmap(imageBitmap);
            photoImage.setVisibility(View.INVISIBLE);
        }
    }
    /* ----------------------------------- Photo Act Ends ---------------------------------------*/

    /* --------------------------------- Song Controls Beings -----------------------------------*/
    @Override
    protected void onDestroy(){
        super.onDestroy();
        mediaPlayer.stop();
        Complete = true;
    }

    @Override
    protected void onPause() {
        super.onPause();
        mediaPlayer.stop();
        Complete = true;
    }

    @Override
    protected void onRestart() {
        super.onRestart();
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    protected void onStart() {
        super.onStart();
    }

    @Override
    protected void onStop() {
        super.onStop();
        mediaPlayer.stop();
        Complete=true;
    }

    /* --------------------------------- Song Controls Ends -------------------------------------*/

    private void connectWebSocket() {
        URI uri;
        try {
            uri = new URI(" websocket address");
        } catch (URISyntaxException e) {
            e.printStackTrace();
            return;
        }

        mWebSocketClient = new WebSocketClient(uri) {
            @Override
            public void onOpen(ServerHandshake handshakedata) {
                Log.i("Websocket", "Opened");
                mWebSocketClient.send("Hello from " + Build.MANUFACTURER + " " + Build.MODEL);

            }

            @Override
            public void onMessage(String s) {
                final String message = s;
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        //TextView textView = (TextView)findViewById(R.id.messages);
                        //textView.setText(textView.getText()) + "\n" + message);
                    }
                });
            }

            @Override
            public void onClose(int i, String s, boolean b) {
                Log.i("Websocket", "Closed " + s);
            }

            @Override
            public void onError(Exception ex) {
                Log.i("Websocket", "Error " + ex.getMessage());
            }
        };

    }
}
