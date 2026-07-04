package com.devconnect.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                // DISABLE CSRF
                .csrf(csrf -> csrf.disable())

                // DISABLE SPRING CORS
                .cors(cors -> cors.disable())

                // ALLOW ALL REQUESTS
                .authorizeHttpRequests(auth -> auth

                        .anyRequest()
                        .permitAll()
                )

                // DISABLE FORM LOGIN
                .formLogin(form ->
                        form.disable())

                // DISABLE BASIC AUTH
                .httpBasic(basic ->
                        basic.disable());

        return http.build();
    }
}