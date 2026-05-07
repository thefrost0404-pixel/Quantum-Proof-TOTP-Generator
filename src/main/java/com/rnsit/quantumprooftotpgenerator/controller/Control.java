package com.rnsit.quantumprooftotpgenerator.controller;

import com.rnsit.quantumprooftotpgenerator.service.TotpService;
import com.rnsit.quantumprooftotpgenerator.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class Control {

    @Autowired
    private TotpService totpService;

    @Autowired
    private UserService userService;

    // Register user
    @PostMapping("/register")
    public String registerUser(
            @RequestParam String username,
            @RequestParam String password) {

        return userService.registerUser(username, password);
    }

    // Generate encrypted secret
    @PostMapping("/generate-secret")
    public String generateSecret(
            @RequestParam String username) {

        return totpService.generateSecret(username);
    }

    // Verify OTP + Dilithium signature
    @PostMapping("/verify")
    public String verifyOtp(
            @RequestParam String username,
            @RequestParam String otp,
            @RequestParam String signature) {

        boolean isValid =
                totpService.verifyCode(username, otp, signature);

        if (isValid) {
            return "Quantum Safe OTP Verified Successfully";
        } else {
            return "Invalid OTP or Signature";
        }
    }
}