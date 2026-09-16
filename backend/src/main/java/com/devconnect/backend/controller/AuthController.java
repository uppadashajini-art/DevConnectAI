package com.devconnect.backend.controller;

import com.devconnect.backend.config.JwtUtil;
import com.devconnect.backend.entity.User;
import com.devconnect.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService service;

    // =========================================
    // REGISTER
    // =========================================
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody User user) {

        System.out.println("================================");
        System.out.println("REGISTER REQUEST RECEIVED");
        System.out.println("EMAIL: " + user.getEmail());

        try {

            User registeredUser = service.register(user);

            System.out.println("REGISTER SUCCESS");
            System.out.println("================================");

            return ResponseEntity.ok(registeredUser);

        } catch (Exception e) {

            System.out.println("REGISTER FAILED");
            System.out.println("ERROR: " + e.getMessage());
            System.out.println("================================");

            Map<String, Object> response = new HashMap<>();

            response.put("message", "Registration failed");

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(response);
        }
    }

    // =========================================
    // LOGIN
    // =========================================
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody User user) {

        System.out.println("================================");
        System.out.println("LOGIN REQUEST RECEIVED");
        System.out.println("EMAIL: " + user.getEmail());

        // =========================================
        // CHECK USER
        // =========================================
        User validUser = service.login(
                user.getEmail(),
                user.getPassword()
        );

        // =========================================
        // LOGIN SUCCESS
        // =========================================
        if (validUser != null) {

            // Generate JWT token
            String token = JwtUtil.generateToken(
                    validUser.getEmail(),
                    validUser.getRole()
            );

            // Create response
            Map<String, Object> response = new HashMap<>();

            response.put("token", token);
            response.put("name", validUser.getName());
            response.put("email", validUser.getEmail());
            response.put("role", validUser.getRole());

            System.out.println("LOGIN SUCCESS");
            System.out.println("ROLE: " + validUser.getRole());
            System.out.println("================================");

            return ResponseEntity.ok(response);
        }

        // =========================================
        // LOGIN FAILED
        // =========================================
        System.out.println("LOGIN FAILED");
        System.out.println("================================");

        Map<String, Object> errorResponse = new HashMap<>();

        errorResponse.put(
                "message",
                "Invalid Email Or Password"
        );

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(errorResponse);
    }
}