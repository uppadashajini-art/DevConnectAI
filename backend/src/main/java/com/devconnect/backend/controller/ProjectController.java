package com.devconnect.backend.controller;

import com.devconnect.backend.entity.Project;
import com.devconnect.backend.service.ProjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

    @Autowired
    private ProjectService service;

    // =========================================
    // CREATE PROJECT
    // =========================================
    @PostMapping
    public Project createProject(
            @RequestBody Project project) {

        return service.createProject(project);
    }

    // =========================================
    // GET ALL PROJECTS
    // ADMIN & PROJECT_MANAGER
    // =========================================
    @GetMapping
    public List<Project> getAllProjects() {

        return service.getAllProjects();
    }

    // =========================================
    // GET PROJECTS BY USER EMAIL
    // TEAM_MEMBER
    // =========================================
    @GetMapping("/{email}")
    public List<Project> getProjectsByEmail(
            @PathVariable String email) {

        return service.getAllProjects(email);
    }

    // =========================================
    // GET PROJECT BY ID
    // =========================================
    @GetMapping("/project/{id}")
    public Optional<Project> getProjectById(
            @PathVariable Long id) {

        return service.getProjectById(id);
    }

    // =========================================
    // UPDATE PROJECT
    // =========================================
    @PutMapping("/{id}")
    public Project updateProject(
            @PathVariable Long id,
            @RequestBody Project project) {

        return service.updateProject(id, project);
    }

    // =========================================
    // DELETE PROJECT
    // =========================================
    @DeleteMapping("/{id}")
    public String deleteProject(
            @PathVariable Long id) {

        return service.deleteProject(id);
    }
}