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

        return repository.save(user);

    }

    // =========================================
    // LOGIN
    // =========================================

    public User login(
            String email,
            String password
    ) {

        User user =
                repository
                        .findByEmail(email)
                        .orElse(null);

        if (

                user != null &&

                user.getPassword()
                        .equals(password)

        ) {

            return user;

        }

        return null;

    }

}