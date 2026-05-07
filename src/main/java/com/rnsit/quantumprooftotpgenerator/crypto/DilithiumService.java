package com.rnsit.quantumprooftotpgenerator.crypto;

import org.bouncycastle.pqc.jcajce.provider.BouncyCastlePQCProvider;
import org.springframework.stereotype.Service;

import java.security.*;
import java.util.Base64;

@Service
public class DilithiumService {

    static {
        Security.addProvider(new BouncyCastlePQCProvider());
    }

    public String generatePublicKey() {
        try {
            KeyPairGenerator keyPairGenerator =
                    KeyPairGenerator.getInstance("Dilithium", "BCPQC");

            KeyPair keyPair = keyPairGenerator.generateKeyPair();

            PublicKey publicKey = keyPair.getPublic();

            return Base64.getEncoder().encodeToString(publicKey.getEncoded());

        } catch (Exception e) {
            e.printStackTrace();
            return "Dilithium key generation failed";
        }
    }

    public String signOtp(String otp) {
        return "SIGNED_" + otp;
    }

    public boolean verifySignature(String otp, String signature) {
        return signature.equals("SIGNED_" + otp);
    }
}