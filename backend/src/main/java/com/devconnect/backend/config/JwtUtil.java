package com.devconnect.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtUtil {

    // =========================================
    // SECRET KEY
    // =========================================
    //
    // IMPORTANT:
    // In production, store this in an environment
    // variable instead of hard-coding it.
    //
    private static final String SECRET =
            "devconnectsecretkeydevconnectsecretkey123456";

    // =========================================
    // TOKEN EXPIRATION
    // =========================================
    // 24 hours
    private static final long EXPIRATION_TIME =
            1000L * 60 * 60 * 24;

    // =========================================
    // GENERATE JWT TOKEN
    // =========================================
    public static String generateToken(
            String email,
            String role) {

        return Jwts.builder()

                // User email
                .setSubject(email)

                // User role
                .claim("role", role)

                // Token creation time
                .setIssuedAt(new Date())

                // Token expiration time
                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + EXPIRATION_TIME
                        )
                )

                // Sign token using HS256
                .signWith(
                        SignatureAlgorithm.HS256,
                        SECRET.getBytes()
                )

                // Convert to String
                .compact();
    }

    // =========================================
    // VALIDATE JWT TOKEN
    // =========================================
    public static boolean validateToken(
            String token) {

        try {

            Jwts.parser()
                    .setSigningKey(
                            SECRET.getBytes()
                    )
                    .parseClaimsJws(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }

    // =========================================
    // EXTRACT EMAIL
    // =========================================
    public static String extractEmail(
            String token) {

        Claims claims =
                Jwts.parser()
                        .setSigningKey(
                                SECRET.getBytes()
                        )
                        .parseClaimsJws(token)
                        .getBody();

        return claims.getSubject();
    }

    // =========================================
    // EXTRACT ROLE
    // =========================================
    public static String extractRole(
            String token) {

        Claims claims =
                Jwts.parser()
                        .setSigningKey(
                                SECRET.getBytes()
                        )
                        .parseClaimsJws(token)
                        .getBody();

        return claims.get(
                "role",
                String.class
        );
    }
}