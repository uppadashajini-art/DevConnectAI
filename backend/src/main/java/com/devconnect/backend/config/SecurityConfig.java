
package com.devconnect.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // Disable CSRF because this is a stateless REST API
                .csrf(csrf -> csrf.disable())

                // Enable CORS using CorsConfig.java
                .cors(Customizer.withDefaults())

                // JWT authentication is stateless
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // API authorization rules
                .authorizeHttpRequests(auth -> auth

                        // Authentication APIs do not require JWT
                        .requestMatchers("/api/auth/**")
                        .permitAll()

                        // AI APIs are currently public
                        .requestMatchers("/api/ai/**")
                        .permitAll()

                        // All other APIs require authentication
                        .anyRequest()
                        .authenticated()
                )

                // JWT filter runs before Spring's username/password filter
                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class
                )

                // Disable default login form
                .formLogin(form -> form.disable())

                // Disable HTTP Basic authentication
                .httpBasic(basic -> basic.disable());

        return http.build();
    }
}

