package com.devconnect.backend.controller;

import com.devconnect.backend.dto.AIRequest;
import com.devconnect.backend.service.AIService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3000")
public class AIController {

    @Autowired
    private AIService aiService;

    @PostMapping("/generate-tasks")
    public ResponseEntity<String> generateTasks(@RequestBody AIRequest request) {

        String response = aiService.generateTasks(request.getProjectDescription());

        return ResponseEntity.ok(response);
    }
}