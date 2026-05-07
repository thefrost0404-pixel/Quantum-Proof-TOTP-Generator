package com.rnsit.quantumprooftotpgenerator.service;

import com.rnsit.quantumprooftotpgenerator.crypto.DilithiumService;
import com.rnsit.quantumprooftotpgenerator.crypto.KyberService;
import com.rnsit.quantumprooftotpgenerator.entity.User;
import com.rnsit.quantumprooftotpgenerator.repository.UserRepository;
import dev.samstevens.totp.code.DefaultCodeVerifier;
import dev.samstevens.totp.code.CodeVerifier;
import dev.samstevens.totp.code.DefaultCodeGenerator;
import dev.samstevens.totp.time.SystemTimeProvider;
import dev.samstevens.totp.code.HashingAlgorithm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Optional;

@Service
public class TotpService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private KyberService kyberService;

    @Autowired
    private DilithiumService dilithiumService;

    @Autowired
    private QRCodeService qrCodeService;

    public String generateSecret(String username) {

        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isEmpty()) {
            return "User not found";
        }

        User user = optionalUser.get();

        byte[] buffer = new byte[20];
        new SecureRandom().nextBytes(buffer);

        String secret = Base64.getEncoder().encodeToString(buffer);

        String encryptedSecret = kyberService.encryptSecret(secret);

        user.setSecretKey(encryptedSecret);
        userRepository.save(user);

        String qrResult = qrCodeService.generateQRCode(secret, username);

        return "Encrypted secret saved.\n" + qrResult;
    }

    public boolean verifyCode(String username, String otp, String signature) {

        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isEmpty()) {
            return false;
        }

        User user = optionalUser.get();

        String encryptedSecret = user.getSecretKey();

        if (encryptedSecret == null) {
            return false;
        }

        String originalSecret =
                kyberService.decryptSecret(encryptedSecret);

        boolean signatureValid =
                dilithiumService.verifySignature(otp, signature);

        if (!signatureValid) {
            return false;
        }

        CodeVerifier verifier = new DefaultCodeVerifier(
                new DefaultCodeGenerator(HashingAlgorithm.SHA1),
                new SystemTimeProvider()
        );

        return verifier.isValidCode(originalSecret, otp);
    }
}