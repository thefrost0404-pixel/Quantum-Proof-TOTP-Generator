package com.rnsit.quantumprooftotpgenerator.service;

import com.rnsit.quantumprooftotpgenerator.crypto.KyberService;
import com.rnsit.quantumprooftotpgenerator.entity.User;
import com.rnsit.quantumprooftotpgenerator.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private KyberService kyberService;

    public String registerUser(String username, String password) {

        User user = new User();

        user.setUsername(username);
        user.setPassword(password);

        // Perform real Kyber KEM
        Map<String, String> kyberResult =
                kyberService.performKyberKEM();

        // Store encrypted secret in DB
        user.setKyberPublicKey(
                kyberResult.get("encryptedSecret")
        );

        userRepository.save(user);

        return "User registered with Quantum-Safe Kyber Security";
    }
}