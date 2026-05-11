package com.rnsit.quantumprooftotpgenerator.controller;

import com.rnsit.quantumprooftotpgenerator.service.TotpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class Control {

    @Autowired
    private TotpService totpService;

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
    public String verifyOtp(
            @RequestParam String username,
            @RequestParam String otp
    ) {
        boolean result = totpService.verifyCode(username, otp);

        if (result) {
            return "OTP Verified Successfully!";
        } else {
            return "Invalid OTP!";
        }
    }
}