package com.devconnect.backend.controller;

import com.devconnect.backend.entity.Task;
import com.devconnect.backend.service.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskService service;

    // =========================================
    // CREATE TASK
    // =========================================
    @PostMapping
    public Task createTask(
            @RequestBody Task task) {

        return service.createTask(task);
    }

    // =========================================
    // GET ALL TASKS
    // ADMIN & PROJECT_MANAGER
    // =========================================
    @GetMapping
    public List<Task> getAllTasks() {

        return service.getAllTasks();
    }

    // =========================================
    // GET TASKS BY USER EMAIL
    // TEAM_MEMBER
    // =========================================
    @GetMapping("/{email}")
    public List<Task> getAllTasks(
            @PathVariable String email) {

        return service.getAllTasks(email);
    }

    // =========================================
    // GET TASK BY ID
    // =========================================
    @GetMapping("/task/{id}")
    public Optional<Task> getTaskById(
            @PathVariable Long id) {

        return service.getTaskById(id);
    }

    // =========================================
    // UPDATE TASK
    // =========================================
    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable Long id,
            @RequestBody Task task) {

        return service.updateTask(id, task);
    }

    // =========================================
    // DELETE TASK
    // =========================================
    @DeleteMapping("/{id}")
    public String deleteTask(
            @PathVariable Long id) {

        return service.deleteTask(id);
    }
}