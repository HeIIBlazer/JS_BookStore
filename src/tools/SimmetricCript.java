/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tools;

import java.math.BigInteger;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.xml.bind.DatatypeConverter;

/**
 *
 * @author Melnikov
 */
public class SimmetricCript {
    private final String transformation = "AES/CBC/PKCS5Padding";
    private SecureRandom random;
    private byte[] rnd;
    private IvParameterSpec ivSpec;
    private byte[] enc;
    private Key key;
    private Cipher cipher;

    public SimmetricCript() {
        init();
    }
    
    private void init(){
        try {
            random=SecureRandom.getInstanceStrong();
            rnd = new byte[16];
            random.nextBytes(rnd);
            ivSpec = new IvParameterSpec(rnd);
            KeyGenerator keygen = KeyGenerator.getInstance("AES");
            keygen.init(256);
            key = keygen.generateKey();
            cipher = Cipher.getInstance(transformation);
            cipher.init(Cipher.ENCRYPT_MODE, key, ivSpec);
        } catch (NoSuchAlgorithmException | NoSuchPaddingException | InvalidKeyException | InvalidAlgorithmParameterException ex) {
            Logger.getLogger(SimmetricCript.class.getName()).log(Level.SEVERE, "ERROR in SimmetricCript", ex);
        }
    }
    public byte[] setCript(String text){
        try {
            cipher.init(Cipher.DECRYPT_MODE, key, ivSpec);
            enc = cipher.doFinal(text.getBytes());
            return enc;
        } catch (IllegalBlockSizeException | BadPaddingException | InvalidKeyException | InvalidAlgorithmParameterException ex) {
            Logger.getLogger(SimmetricCript.class.getName()).log(Level.SEVERE, "ERROR in SimmetricCript", ex);
        }
        return null;
    }
    
    public String getCript(byte[] enc){
        try {
            cipher.init(Cipher.DECRYPT_MODE, key, ivSpec);
            return new String(cipher.doFinal(enc));
        } catch (InvalidKeyException | InvalidAlgorithmParameterException | IllegalBlockSizeException | BadPaddingException ex) {
            Logger.getLogger(SimmetricCript.class.getName()).log(Level.SEVERE, "ERROR in SimmetricCript", ex);
        }
        return null;
    }
}