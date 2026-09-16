package com.devconnect.backend.service;

import com.devconnect.backend.entity.User;
import com.devconnect.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    // =========================================
    // REGISTER
    // =========================================
    public User register(User user) {

        // Check whether email already exists
        User existingUser =
                repository.findByEmail(user.getEmail())
                        .orElse(null);

        if (existingUser != null) {
            throw new RuntimeException(
                    "Email already registered"
            );
        }

        return repository.save(user);
    }

    // =========================================
    // LOGIN
    // =========================================
    public User login(
            String email,
            String password) {

        User user =
                repository.findByEmail(email)
                        .orElse(null);

        if (user == null) {
            return null;
        }

        if (!user.getPassword().equals(password)) {
            return null;
        }

        return user;
    }
}