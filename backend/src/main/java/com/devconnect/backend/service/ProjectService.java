package com.devconnect.backend.service;

import com.devconnect.backend.entity.Activity;
import com.devconnect.backend.entity.Notification;
import com.devconnect.backend.entity.Project;

import com.devconnect.backend.repository.ActivityRepository;
import com.devconnect.backend.repository.NotificationRepository;
import com.devconnect.backend.repository.ProjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository repository;

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    // =========================================
    // CREATE PROJECT
    // =========================================
    public Project createProject(Project project) {

        Project savedProject =
                repository.save(project);

        // -----------------------------------------
        // SAVE ACTIVITY
        // -----------------------------------------

        Activity activity = new Activity();

        activity.setTitle("New Project Created");

        activity.setDescription(
                project.getTitle()
                        + " project was created"
        );

        activity.setColor("blue");

        activityRepository.save(activity);

        // -----------------------------------------
        // SAVE NOTIFICATION
        // -----------------------------------------

        Notification notification =
                new Notification();

        notification.setTitle("Project Created");

        notification.setMessage(
                project.getTitle()
                        + " project was created"
        );

        notification.setType("project");

        notification.setTime("Just Now");

        notificationRepository.save(notification);

        return savedProject;
    }

    // =========================================
    // GET ALL PROJECTS
    // =========================================
    public List<Project> getAllProjects() {

        return repository.findAll();
    }

    // =========================================
    // GET PROJECTS BY USER EMAIL
    // =========================================
    public List<Project> getAllProjects(
            String userEmail) {

        return repository.findByUserEmail(
                userEmail
        );
    }

    // =========================================
    // GET PROJECT BY ID
    // =========================================
    public Optional<Project> getProjectById(
            Long id) {

        return repository.findById(id);
    }

    // =========================================
    // UPDATE PROJECT
    // =========================================
    public Project updateProject(
            Long id,
            Project updatedProject) {

        Project project =
                repository.findById(id)
                        .orElse(null);

        if (project == null) {
            return null;
        }

        project.setTitle(
                updatedProject.getTitle()
        );

        project.setDescription(
                updatedProject.getDescription()
        );

        project.setTechStack(
                updatedProject.getTechStack()
        );

        project.setUserEmail(
                updatedProject.getUserEmail()
        );

        project.setTotalTasks(
                updatedProject.getTotalTasks()
        );

        project.setCompletedTasks(
                updatedProject.getCompletedTasks()
        );

        project.setDeadline(
                updatedProject.getDeadline()
        );

        Project updated =
                repository.save(project);

        // -----------------------------------------
        // SAVE ACTIVITY
        // -----------------------------------------

        Activity activity =
                new Activity();

        activity.setTitle(
                "Project Updated"
        );

        activity.setDescription(
                project.getTitle()
                        + " project was updated"
        );

        activity.setColor("green");

        activityRepository.save(activity);

        // -----------------------------------------
        // SAVE NOTIFICATION
        // -----------------------------------------

        Notification notification =
                new Notification();

        notification.setTitle(
                "Project Updated"
        );

        notification.setMessage(
                project.getTitle()
                        + " project was updated"
        );

        notification.setType("project");

        notification.setTime("Just Now");

        notificationRepository.save(notification);

        return updated;
    }

    // =========================================
    // DELETE PROJECT
    // =========================================
    public String deleteProject(Long id) {

        // Check project exists
        Project project =
                repository.findById(id)
                        .orElse(null);

        if (project == null) {
            return "Project not found";
        }

        // Delete project
        repository.deleteById(id);

        // -----------------------------------------
        // SAVE ACTIVITY
        // -----------------------------------------

        Activity activity =
                new Activity();

        activity.setTitle(
                "Project Deleted"
        );

        activity.setDescription(
                project.getTitle()
                        + " project was deleted"
        );

        activity.setColor("red");

        activityRepository.save(activity);

        // -----------------------------------------
        // SAVE NOTIFICATION
        // -----------------------------------------

        Notification notification =
                new Notification();

        notification.setTitle(
                "Project Deleted"
        );

        notification.setMessage(
                project.getTitle()
                        + " project was deleted"
        );

        notification.setType("project");

        notification.setTime("Just Now");

        notificationRepository.save(notification);

        return "Project Deleted Successfully";
    }
}