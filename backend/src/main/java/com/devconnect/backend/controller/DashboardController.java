package com.devconnect.backend.controller;

import com.devconnect.backend.repository.ProjectRepository;
import com.devconnect.backend.repository.TaskRepository;
import com.devconnect.backend.repository.TeamRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TeamRepository teamRepository;

    @GetMapping
    public Map<String, Long> getDashboardStats() {

        Map<String, Long> stats = new HashMap<>();

        stats.put(
                "projects",
                projectRepository.count()
        );

        stats.put(
                "tasks",
                taskRepository.count()
        );

        stats.put(
                "team",
                teamRepository.count()
        );

        stats.put(
                "completed",
                taskRepository.findAll()
                        .stream()
                        .filter(task ->
                                "Completed".equals(task.getStatus()))
                        .count()
        );

        return stats;
    }
}