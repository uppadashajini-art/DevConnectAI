
package com.devconnect.backend.controller;

import com.devconnect.backend.entity.Project;
import com.devconnect.backend.service.ProjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private ProjectService service;

    // =========================================
    // CREATE PROJECT
    // POST /api/projects
    // =========================================

    @PostMapping
    public ResponseEntity<Project> createProject(
            @RequestBody Project project) {

        Project savedProject =
                service.createProject(project);

        return ResponseEntity.ok(savedProject);
    }

    // =========================================
    // GET ALL PROJECTS
    // GET /api/projects
    // =========================================

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {

        System.out.println(
                "🔥🔥 PROJECT CONTROLLER - GET ALL REACHED 🔥🔥"
        );

        List<Project> projects =
                service.getAllProjects();

        return ResponseEntity.ok(projects);
    }

    // =========================================
    // GET PROJECTS BY USER EMAIL
    // GET /api/projects/user/{email}
    // =========================================

    @GetMapping("/user/{email}")
    public ResponseEntity<List<Project>> getProjectsByEmail(
            @PathVariable String email) {

        List<Project> projects =
                service.getAllProjects(email);

        return ResponseEntity.ok(projects);
    }

    // =========================================
    // GET PROJECT BY ID
    // GET /api/projects/{id}
    // =========================================

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(
            @PathVariable Long id) {

        System.out.println(
                "🔥🔥 PROJECT CONTROLLER - GET BY ID REACHED 🔥🔥"
        );

        System.out.println(
                "PROJECT ID: " + id
        );

        Optional<Project> project =
                service.getProjectById(id);

        if (project.isPresent()) {

            return ResponseEntity.ok(
                    project.get()
            );
        }

        return ResponseEntity.notFound().build();
    }

    // =========================================
    // UPDATE PROJECT
    // PUT /api/projects/{id}
    // =========================================

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(
            @PathVariable Long id,
            @RequestBody Project project) {

        System.out.println(
                "🔥🔥 PROJECT CONTROLLER - UPDATE REACHED 🔥🔥"
        );

        System.out.println(
                "PROJECT ID: " + id
        );

        Project updatedProject =
                service.updateProject(
                        id,
                        project
                );

        if (updatedProject == null) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity.ok(
                updatedProject
        );
    }

    // =========================================
    // DELETE PROJECT
    // DELETE /api/projects/{id}
    // =========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(
            @PathVariable Long id) {

        System.out.println(
                "🔥🔥 PROJECT CONTROLLER - DELETE REACHED 🔥🔥"
        );

        System.out.println(
                "PROJECT ID: " + id
        );

        String result =
                service.deleteProject(id);

        if ("Project not found".equals(result)) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity.ok(result);
    }
}

