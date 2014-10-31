package com.example.lyra.lyra;

import android.os.Bundle;
import android.os.Environment;

import java.net.URI;
import java.io.File;

import android.content.Context;
import android.provider.MediaStore;
import android.widget.ImageView;

/**
 * Created by Derek on 2014-10-21.
 */
public class LibraryActivity {


    private File[] getMusic(){
        File musicDirectory = new File(Environment.DIRECTORY_MUSIC);
        File[] musicListing = musicDirectory.listFiles();
        if (musicListing != null){
            return musicListing;
        } else {
            return null;
        }
    }
}
