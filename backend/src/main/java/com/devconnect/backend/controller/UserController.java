package com.devconnect.backend.controller;

import com.devconnect.backend.entity.User;
import com.devconnect.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/users")


public class UserController {

    @Autowired
    private UserRepository userRepository;

    // =========================================
    // GET ALL USERS
    // =========================================

    @GetMapping

    public List<User> getAllUsers() {

        return userRepository.findAll();

    }

}