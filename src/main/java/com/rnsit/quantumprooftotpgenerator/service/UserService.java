package com.rnsit.quantumprooftotpgenerator.service;

import com.rnsit.quantumprooftotpgenerator.crypto.KyberService;
import com.rnsit.quantumprooftotpgenerator.entity.User;
import com.rnsit.quantumprooftotpgenerator.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

        // Generate Kyber key
        String kyberPublicKey = kyberService.generatePublicKey();
        user.setKyberPublicKey(kyberPublicKey);

        userRepository.save(user);

        return "User registered with Kyber + Dilithium keys";
    }
}