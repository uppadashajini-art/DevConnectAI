package com.devconnect.backend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

public class JwtUtil {

    // =========================
    // STRONG SECRET KEY
    // =========================
    private static final String SECRET =

            "devconnectsecretkeydevconnectsecretkey123456";

    // =========================
    // GENERATE TOKEN
    // =========================
    public static String generateToken(

            String email,

            String role

    ) {

        return Jwts.builder()

                .setSubject(email)

                .claim("role", role)

                .setIssuedAt(
                        new Date()
                )

                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000 * 60 * 60 * 24
                        )
                )

                .signWith(
                        SignatureAlgorithm.HS256,
                        SECRET.getBytes()
                )

                .compact();
    }

    // =========================
    // VALIDATE TOKEN
    // =========================
    public static boolean validateToken(
            String token
    ) {

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

    // =========================
    // EXTRACT EMAIL
    // =========================
    public static String extractEmail(
            String token
    ) {

        Claims claims = Jwts.parser()

                .setSigningKey(
                        SECRET.getBytes()
                )

                .parseClaimsJws(token)

                .getBody();

        return claims.getSubject();
    }

    // =========================
    // EXTRACT ROLE
    // =========================
    public static String extractRole(
            String token
    ) {

        Claims claims = Jwts.parser()

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