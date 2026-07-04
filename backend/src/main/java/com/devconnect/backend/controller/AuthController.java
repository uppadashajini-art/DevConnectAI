package com.devconnect.backend.controller;

import com.devconnect.backend.config.JwtUtil;
import com.devconnect.backend.entity.User;
import com.devconnect.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService service;

    // =========================
    // REGISTER
    // =========================
    @PostMapping("/register")
    public User register(
            @RequestBody User user
    ) {

        System.out.println("REGISTER REQUEST");

        System.out.println(user);

        return service.register(user);
    }

    // =========================
    // LOGIN
    // =========================
    @PostMapping("/login")
    public Map<String, Object> login(
            @RequestBody User user
    ) {

        System.out.println("================================");

        System.out.println("LOGIN REQUEST RECEIVED");

        System.out.println("EMAIL: " + user.getEmail());

        System.out.println("PASSWORD: " + user.getPassword());

        // =========================
        // CHECK USER
        // =========================
        User validUser =
                service.login(
                        user.getEmail(),
                        user.getPassword()
                );

        // DEBUG
        System.out.println("DATABASE USER: " + validUser);

        // =========================
        // LOGIN SUCCESS
        // =========================
        if (validUser != null) {

            // GENERATE JWT TOKEN
            String token =
                    JwtUtil.generateToken(
                            validUser.getEmail(),
                            validUser.getRole()
                    );

            // RESPONSE
            Map<String, Object> response =
                    new HashMap<>();

            // SAVE TOKEN
            response.put(
                    "token",
                    token
            );

            // SAVE NAME
            response.put(
                    "name",
                    validUser.getName()
            );

            // SAVE EMAIL
            response.put(
                    "email",
                    validUser.getEmail()
            );

            // SAVE ROLE
            response.put(
                    "role",
                    validUser.getRole()
            );

            System.out.println("LOGIN SUCCESS");

            System.out.println("================================");

            return response;
        }

        // =========================
        // LOGIN FAILED
        // =========================
        System.out.println("LOGIN FAILED");

        System.out.println("================================");

        Map<String, Object> errorResponse =
                new HashMap<>();

        errorResponse.put(
                "message",
                "Invalid Email Or Password"
        );

        return errorResponse;
    }
}