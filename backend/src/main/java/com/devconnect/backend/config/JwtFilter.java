package com.devconnect.backend.config;

import com.devconnect.backend.entity.User;
import com.devconnect.backend.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // =========================================
        // GET REQUEST PATH
        // =========================================

        String path = request.getServletPath();

        // =========================================
        // ALLOW CORS OPTIONS REQUEST
        // =========================================

        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {

            filterChain.doFilter(request, response);
            return;
        }

        // =========================================
        // PUBLIC ROUTES
        // =========================================

        if (path.equals("/api/auth/login")
                || path.equals("/api/auth/register")
                || path.equals("/api/users")) {

            filterChain.doFilter(request, response);
            return;
        }

        // =========================================
        // GET AUTHORIZATION HEADER
        // =========================================

        String authHeader =
                request.getHeader("Authorization");

        // =========================================
        // CHECK JWT TOKEN
        // =========================================

        if (authHeader != null
                && authHeader.startsWith("Bearer ")) {

            // Remove "Bearer "
            String token =
                    authHeader.substring(7);

            // =========================================
            // VALIDATE TOKEN
            // =========================================

            boolean valid =
                    JwtUtil.validateToken(token);

            if (!valid) {

                response.setStatus(
                        HttpServletResponse.SC_UNAUTHORIZED
                );

                response.getWriter()
                        .write("Invalid JWT Token");

                return;
            }

            // =========================================
            // GET EMAIL FROM TOKEN
            // =========================================

            String email =
                    JwtUtil.extractEmail(token);

            // =========================================
            // FIND USER IN DATABASE
            // =========================================

            User user =
                    userRepository
                            .findByEmail(email)
                            .orElse(null);

            // =========================================
            // USER FOUND
            // =========================================

            if (user != null) {

                // Example:
                // ADMIN -> ROLE_ADMIN
                // PROJECT_MANAGER -> ROLE_PROJECT_MANAGER
                // TEAM_MEMBER -> ROLE_TEAM_MEMBER

                String role =
                        "ROLE_" + user.getRole();

                // =========================================
                // CREATE AUTHENTICATION OBJECT
                // =========================================

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                user,
                                null,
                                Collections.singletonList(
                                        new SimpleGrantedAuthority(role)
                                )
                        );

                // =========================================
                // ADD REQUEST DETAILS
                // =========================================

                authentication.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                // =========================================
                // STORE AUTHENTICATION
                // =========================================

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authentication);

            } else {

                // Token is valid but user doesn't exist
                response.setStatus(
                        HttpServletResponse.SC_UNAUTHORIZED
                );

                response.getWriter()
                        .write("User not found");

                return;
            }

        }

        // =========================================
        // CONTINUE REQUEST
        // =========================================

        filterChain.doFilter(request, response);
    }
}