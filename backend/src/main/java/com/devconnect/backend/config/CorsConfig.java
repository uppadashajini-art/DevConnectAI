package com.devconnect.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {

        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/**")

                        .allowedOrigins(
                                // Local development
                                "http://localhost:3000",
                                "http://localhost:5173",

                                // Vercel production frontend
                                "https://dev-connect-ai-beta.vercel.app",

                                // Current Vercel deployment
                                "https://dev-connect-2ray6n3al-uppadashajini-5916s-projects.vercel.app"
                        )

                        .allowedMethods(
                                "GET",
                                "POST",
                                "PUT",
                                "DELETE",
                                "OPTIONS"
                        )

                        .allowedHeaders("*")

                        .allowCredentials(true);
            }
        };
    }
}