package com.rnsit.quantumprooftotpgenerator.crypto;

import org.bouncycastle.crypto.AsymmetricCipherKeyPair;
import org.bouncycastle.crypto.SecretWithEncapsulation;
import org.bouncycastle.pqc.crypto.crystals.kyber.*;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class KyberService {

    public Map<String, String> performKyberKEM() {
        Map<String, String> result = new HashMap<>();

        try {
            SecureRandom secureRandom = new SecureRandom();

            // STEP 1: Generate Kyber Key Pair
            KyberKeyPairGenerator keyPairGenerator = new KyberKeyPairGenerator();

            keyPairGenerator.init(
                    new KyberKeyGenerationParameters(
                            secureRandom,
                            KyberParameters.kyber512
                    )
            );

            AsymmetricCipherKeyPair keyPair =
                    keyPairGenerator.generateKeyPair();

            KyberPublicKeyParameters publicKey =
                    (KyberPublicKeyParameters) keyPair.getPublic();

            KyberPrivateKeyParameters privateKey =
                    (KyberPrivateKeyParameters) keyPair.getPrivate();

            // STEP 2: Encapsulation (Sender Side)
            KyberKEMGenerator kemGenerator =
                    new KyberKEMGenerator(secureRandom);

            SecretWithEncapsulation secretEncapsulation =
                    kemGenerator.generateEncapsulated(publicKey);

            byte[] encryptedSecret =
                    secretEncapsulation.getEncapsulation();

            byte[] senderSharedSecret =
                    secretEncapsulation.getSecret();

            // STEP 3: Decapsulation (Receiver Side)
            KyberKEMExtractor kemExtractor =
                    new KyberKEMExtractor(privateKey);

            byte[] receiverSharedSecret =
                    kemExtractor.extractSecret(encryptedSecret);

            // STEP 4: Store results for frontend/demo
            result.put(
                    "encryptedSecret",
                    Base64.getEncoder().encodeToString(encryptedSecret)
            );

            result.put(
                    "senderSharedSecret",
                    Base64.getEncoder().encodeToString(senderSharedSecret)
            );

            result.put(
                    "receiverSharedSecret",
                    Base64.getEncoder().encodeToString(receiverSharedSecret)
            );

            boolean secretsMatch = java.util.Arrays.equals(
                    senderSharedSecret,
                    receiverSharedSecret
            );

            result.put(
                    "status",
                    secretsMatch
                            ? "Quantum Secure Session Established"
                            : "Quantum Session Failed"
            );

        } catch (Exception e) {
            e.printStackTrace();

            result.put(
                    "status",
                    "Kyber KEM failed: " + e.getMessage()
            );
        }

        return result;
    }
}