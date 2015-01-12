/* 
 * Analysis, take a music file(mp3, wav, ...) and obtain various metrics on it
 */

import javazoom.jl.decoder.Bitstream;
import javazoom.jl.decoder.BitstreamException;
import javazoom.jl.decoder.Decoder;
import javazoom.jl.decoder.DecoderException;
import javazoom.jl.decoder.Header;
import javazoom.jl.decoder.SampleBuffer;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import java.util.Arrays;

public class Analysis
{
	public static void main(String[] args){
		String filename = args[0];
		System.out.println(Arrays.toString(decipher(filename)));
	}
	public static short[] decipher(String filename){
		Bitstream bitStream;
		FileInputStream data = null;
		short[] samples = {};
		SampleBuffer buffer = null;
		boolean done = false;
		Header frameHeader;

		try {
			data = new FileInputStream(filename);
		} catch (FileNotFoundException e) {
			System.err.println("File not found: " + e.getMessage());
		}

		bitStream = new Bitstream(data);
		Decoder decoder = new Decoder();

		while (! done) {
			try {
				frameHeader = bitStream.readFrame();
				if (frameHeader == null) {
					done = true;
				} else {
					buffer = (SampleBuffer) decoder.decodeFrame(frameHeader, bitStream);
					samples = concatArrays(samples, buffer.getBuffer());
				}
				bitStream.closeFrame();
			} catch (Exception e) {
				System.err.println(e);
			}
		}
		return samples;
	}
	private static short[] concatArrays(short[] A, short[] B) {

		int aLen = A.length;
		int bLen = B.length;
		short[] C= new short[aLen+bLen];

		System.arraycopy(A, 0, C, 0, aLen);
		System.arraycopy(B, 0, C, aLen, bLen);

		return C;
	}
}
