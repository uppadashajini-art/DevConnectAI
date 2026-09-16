package com.devconnect.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

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
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http

                // =========================================
                // DISABLE CSRF
                // =========================================
                // JWT authentication is stateless,
                // so CSRF protection is not required here.
                .csrf(csrf -> csrf.disable())

                // =========================================
                // ENABLE CORS
                // =========================================
                .cors(Customizer.withDefaults())

                // =========================================
                // STATELESS SESSION
                // =========================================
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // =========================================
                // AUTHORIZATION RULES
                // =========================================
                .authorizeHttpRequests(auth -> auth

                        // ---------------------------------
                        // CORS PRE-FLIGHT
                        // ---------------------------------
                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        )
                        .permitAll()

                        // ---------------------------------
                        // LOGIN + REGISTER
                        // ---------------------------------
                        .requestMatchers(
                                "/api/auth/**"
                        )
                        .permitAll()

                        // ---------------------------------
                        // AI APIs
                        // ---------------------------------
                        .requestMatchers(
                                "/api/ai/**"
                        )
                        .permitAll()

                        // ---------------------------------
                        // ALL OTHER APIs
                        // REQUIRE JWT
                        // ---------------------------------
                        .anyRequest()
                        .authenticated()
                )

                // =========================================
                // JWT FILTER
                // =========================================
                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class
                )

                // =========================================
                // DISABLE FORM LOGIN
                // =========================================
                .formLogin(form -> form.disable())

                // =========================================
                // DISABLE HTTP BASIC
                // =========================================
                .httpBasic(basic -> basic.disable());

        return http.build();
    }
}