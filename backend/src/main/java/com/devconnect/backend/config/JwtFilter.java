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

        String path = request.getServletPath();

        // =========================================
        // CORS PRE-FLIGHT
        // =========================================
        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
            filterChain.doFilter(request, response);
            return;
        }

        // =========================================
        // PUBLIC AUTH APIs
        // =========================================
        if (path.equals("/api/auth/login")
                || path.equals("/api/auth/register")) {

            filterChain.doFilter(request, response);
            return;
        }

        // =========================================
        // GET JWT TOKEN
        // =========================================
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null
                || !authHeader.startsWith("Bearer ")) {

            System.out.println("================================");
            System.out.println("JWT FILTER");
            System.out.println("REQUEST PATH: "
                    + request.getRequestURI());
            System.out.println("REQUEST METHOD: "
                    + request.getMethod());
            System.out.println("NO JWT TOKEN");
            System.out.println("================================");

            filterChain.doFilter(request, response);
            return;
        }

        // =========================================
        // EXTRACT TOKEN
        // =========================================
        String token = authHeader.substring(7);

        // =========================================
        // VALIDATE TOKEN
        // =========================================
        if (!JwtUtil.validateToken(token)) {

            System.out.println("================================");
            System.out.println("JWT FILTER");
            System.out.println("INVALID JWT TOKEN");
            System.out.println("REQUEST PATH: "
                    + request.getRequestURI());
            System.out.println("================================");

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            response.getWriter().write(
                    "Invalid JWT Token"
            );

            return;
        }

        // =========================================
        // EXTRACT EMAIL
        // =========================================
        String email;

        try {

            email = JwtUtil.extractEmail(token);

        } catch (Exception e) {

            System.out.println("================================");
            System.out.println("JWT FILTER");
            System.out.println("FAILED TO EXTRACT EMAIL");
            System.out.println("================================");

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            response.getWriter().write(
                    "Invalid JWT Token"
            );

            return;
        }

        // =========================================
        // FIND USER
        // =========================================
        User user =
                userRepository
                        .findByEmail(email)
                        .orElse(null);

        if (user == null) {

            System.out.println("================================");
            System.out.println("JWT FILTER");
            System.out.println("USER NOT FOUND");
            System.out.println("EMAIL: " + email);
            System.out.println("================================");

            response.setStatus(
                    HttpServletResponse.SC_UNAUTHORIZED
            );

            response.getWriter().write(
                    "User not found"
            );

            return;
        }

        // =========================================
        // CREATE ROLE AUTHORITY
        // =========================================
        String userRole = user.getRole();

        String authority = "ROLE_" + userRole;

        System.out.println("================================");
        System.out.println("JWT FILTER");
        System.out.println("REQUEST METHOD: "
                + request.getMethod());
        System.out.println("REQUEST PATH: "
                + request.getRequestURI());
        System.out.println("JWT USER EMAIL: "
                + email);
        System.out.println("DATABASE ROLE: "
                + userRole);
        System.out.println("CREATED AUTHORITY: "
                + authority);
        System.out.println("================================");

        // =========================================
        // CREATE AUTHENTICATION
        // =========================================
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        user,
                        null,
                        Collections.singletonList(
                                new SimpleGrantedAuthority(
                                        authority
                                )
                        )
                );

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

        System.out.println(
                "SPRING AUTHORITIES: "
                        + authentication.getAuthorities()
        );

        // =========================================
        // CONTINUE REQUEST
        // =========================================
        filterChain.doFilter(request, response);
    }
}