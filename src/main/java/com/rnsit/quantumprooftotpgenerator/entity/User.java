package com.rnsit.quantumprooftotpgenerator.entity;

import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String secretKey;

    private String kyberPublicKey;

    // New field
    private String dilithiumPublicKey;

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public String getKyberPublicKey() {
        return kyberPublicKey;
    }

    public void setKyberPublicKey(String kyberPublicKey) {
        this.kyberPublicKey = kyberPublicKey;
    }

    public String getDilithiumPublicKey() {
        return dilithiumPublicKey;
    }

    public void setDilithiumPublicKey(String dilithiumPublicKey) {
        this.dilithiumPublicKey = dilithiumPublicKey;
    }
}