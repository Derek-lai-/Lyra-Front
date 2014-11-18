package com.example.lyra.lyra;

import java.io.File;
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


public class MainMenuActivity extends Activity {
    private static final String TAG = "CallCamera";
    private static final int CAPTURE_IMAGE_ACTIVITY_REQ = 0;
    private WebSocketClient mWebSocketClient;
    private Button playSong;
    private Button stopSong;
    private SeekBar seekBar;
    private MediaPlayer mediaPlayer;
    private TextView songName;

    private boolean Complete;

    Uri fileUri = null;
    ImageView photoImage = null;

    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_fullscreen);

        photoImage = (ImageView) findViewById(R.id.photo_img);
        playSong = (Button) findViewById(R.id.btnPlay);
        stopSong = (Button) findViewById(R.id.btnPause);
        seekBar = (SeekBar) findViewById(R.id.seekBar);
        songName = (TextView) findViewById(R.id.songName);

        mediaPlayer = new MediaPlayer();

        mediaPlayer.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
            @Override
            public void onCompletion(MediaPlayer mediaPlayer) {
                Complete = true;
            }
        });

        photoImage.setImageDrawable(null);
        Button btnCamera = (Button) findViewById(R.id.capture);

        btnCamera.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                cameraAct();
            }
        });

        Button btnSongs = (Button) findViewById(R.id.songs);
        btnSongs.setOnClickListener(new View.OnClickListener(){
            public void onClick(View v){
                Intent i = new Intent(MainMenuActivity.this, LibraryActivity.class);
                MainMenuActivity.this.startActivity(i);
            }
        });
    }

    private void cameraAct(){
        Intent i = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        File file = getOutputPhotoFile();
        fileUri = Uri.fromFile(getOutputPhotoFile());
        i.putExtra(MediaStore.EXTRA_OUTPUT, fileUri);
        i.putExtra("android.intent.extras.CAMERA_FACING", 1);
        startActivityForResult(i, CAPTURE_IMAGE_ACTIVITY_REQ);
    }


    private File getOutputPhotoFile(){
        File directory = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), getPackageName());
        if (!directory.exists()){
            if (!directory.mkdirs()){
                Log.e(TAG, "Failed to create storage directory.");
                return null;
            }
        }
        String timeStamp = new SimpleDateFormat("yyyMMdd_HHmmss", Locale.CANADA).format(new Date());
        return new File(directory.getPath() + File.separator + "IMG_" + timeStamp + ".jpg");
    }

    private void showPhoto(Uri photoUri){
        File imageFile = new File(photoUri.getPath());
        if (imageFile.exists()){
            Drawable oldDrawable = photoImage.getDrawable();
            if (oldDrawable != null){
                ((BitmapDrawable) oldDrawable).getBitmap().recycle();
            }
            Bitmap bitmap = BitmapFactory.decodeFile(imageFile.getAbsolutePath());
            BitmapDrawable drawable = new BitmapDrawable(this.getResources(), bitmap);
            photoImage.setScaleType(ImageView.ScaleType.FIT_CENTER);
            photoImage.setImageDrawable(drawable);
        }

    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data){
        if (requestCode == CAPTURE_IMAGE_ACTIVITY_REQ) {
            if (resultCode == RESULT_OK){
                Uri photoUri = null;
                if (data == null) {
                    // bug here
                    Toast.makeText(this, "Image saved successfully", Toast.LENGTH_SHORT).show();
                    photoUri = fileUri;
                } else {
                    photoUri = data.getData();
                    Toast.makeText(this, "Imaged saved sucessfully in : " + data.getData(), Toast.LENGTH_LONG).show();
                }
                showPhoto(photoUri);
            } else if (resultCode == RESULT_CANCELED){
                Toast.makeText(this, "Cancelled", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(this, "Image capture failed!", Toast.LENGTH_LONG).show();
            }
        }
    }

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
