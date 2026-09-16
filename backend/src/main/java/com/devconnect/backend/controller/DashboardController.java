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

    // =========================================
    // GET DASHBOARD STATISTICS
    // =========================================
    @GetMapping
    public Map<String, Long> getDashboardStats() {

        Map<String, Long> stats = new HashMap<>();

        // Total projects
        stats.put(
                "projects",
                projectRepository.count()
        );

        // Total tasks
        stats.put(
                "tasks",
                taskRepository.count()
        );

        // Total team members
        stats.put(
                "team",
                teamRepository.count()
        );

        // Total completed tasks
        long completedTasks = taskRepository.findAll()
                .stream()
                .filter(task ->
                        "Completed".equals(task.getStatus())
                )
                .count();

        stats.put(
                "completed",
                completedTasks
        );

        return stats;
    }
}