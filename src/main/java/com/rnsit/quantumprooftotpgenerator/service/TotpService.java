package com.rnsit.quantumprooftotpgenerator.service;

import com.rnsit.quantumprooftotpgenerator.entity.User;
import com.rnsit.quantumprooftotpgenerator.repository.UserRepository;
import dev.samstevens.totp.code.CodeVerifier;
import dev.samstevens.totp.code.DefaultCodeGenerator;
import dev.samstevens.totp.code.DefaultCodeVerifier;
import dev.samstevens.totp.code.HashingAlgorithm;
import dev.samstevens.totp.secret.DefaultSecretGenerator;
import dev.samstevens.totp.time.SystemTimeProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TotpService {

    @Autowired
    private UserRepository userRepository;

    public String registerUser(String username, String password) {

        Optional<User> existingUser = userRepository.findByUsername(username);

        if (existingUser.isPresent()) {
            return "User already exists!";
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(password);

        userRepository.save(user);

        return "User registered successfully!";
    }

    public String generateSecret(String username) {

        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isEmpty()) {
            return "User not found!";
        }

        User user = optionalUser.get();

        DefaultSecretGenerator secretGenerator =
                new DefaultSecretGenerator();

        String secret = secretGenerator.generate();

        user.setSecretKey(secret);

        // Keep only Kyber simulation
        user.setKyberPublicKey("KYBER_" + username);

        userRepository.save(user);

        return "Your TOTP Secret: " + secret;
    }

    public boolean verifyCode(String username, String otp) {

        Optional<User> optionalUser =
                userRepository.findByUsername(username);

        if (optionalUser.isEmpty()) {
            return false;
        }

        User user = optionalUser.get();

        String secret = user.getSecretKey();

        CodeVerifier verifier = new DefaultCodeVerifier(
                new DefaultCodeGenerator(HashingAlgorithm.SHA1),
                new SystemTimeProvider()
        );

        return verifier.isValidCode(secret, otp);
    }
}