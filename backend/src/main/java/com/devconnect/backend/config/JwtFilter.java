
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
        // ALLOW OPTIONS REQUEST
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
        // NO JWT
        // =========================================
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

        // =========================================
        // USER NOT FOUND
        // =========================================
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
        // GET USER ROLE
        // =========================================
        String userRole = user.getRole();

        // =========================================
        // CREATE SPRING SECURITY AUTHORITY
        // =========================================
        String authority =
                "ROLE_" + userRole;

        // =========================================
        // DEBUG LOGGING
        // =========================================
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

        // =========================================
        // REQUEST DETAILS
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

        // =========================================
        // PRINT SPRING AUTHORITIES
        // =========================================
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
