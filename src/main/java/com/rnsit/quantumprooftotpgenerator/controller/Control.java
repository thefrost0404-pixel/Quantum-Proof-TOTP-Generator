package com.rnsit.quantumprooftotpgenerator.controller;

import com.rnsit.quantumprooftotpgenerator.crypto.KyberService;
import com.rnsit.quantumprooftotpgenerator.service.TotpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class Control {

    @Autowired
    private TotpService totpService;

    @Autowired
    private KyberService kyberService;

    @PostMapping("/register")
    public String registerUser(
            @RequestParam String username,
            @RequestParam String password
    ) {
        return totpService.registerUser(username, password);
    }

    @PostMapping("/generate")
    public String generateSecret(
            @RequestParam String username
    ) {
        return totpService.generateSecret(username);
    }

    @PostMapping("/verify")
    public Object verifyOtp(
            @RequestParam String username,
            @RequestParam String otp
    ) {
        boolean result = totpService.verifyCode(username, otp);

        if (result) {

            // Run REAL Kyber KEM after OTP success
            Map<String, String> kyberResult =
                    kyberService.performKyberKEM();

            return kyberResult;

        } else {
            return "Invalid OTP!";
        }
    }
}