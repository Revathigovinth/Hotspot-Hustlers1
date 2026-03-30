package com.foodapp.dto;

public class AuthResponse {

    private String token;
    private String email;
    private String role;

    // Constructor
    public AuthResponse(String token, String email, String role) {
        this.token = token;
        this.email = email;
        this.role = role;
    }

    // Getters
    public String getToken() {
        return token;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }
}