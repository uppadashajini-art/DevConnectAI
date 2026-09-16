
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

        // Default total tasks
        if (project.getTotalTasks() == null) {
            project.setTotalTasks(0);
        }

        // Default completed tasks
        if (project.getCompletedTasks() == null) {
            project.setCompletedTasks(0);
        }

        // Default priority
        if (project.getPriority() == null
                || project.getPriority().isBlank()) {

            project.setPriority("MEDIUM");
        }

        // Default status
        if (project.getStatus() == null
                || project.getStatus().isBlank()) {

            project.setStatus("Pending");
        }

        // Save project
        Project savedProject =
                repository.save(project);

        // =====================================
        // ACTIVITY
        // =====================================

        Activity activity = new Activity();

        activity.setTitle("New Project Created");

        activity.setDescription(
                savedProject.getTitle()
                        + " project was created"
        );

        activity.setColor("blue");

        activityRepository.save(activity);

        // =====================================
        // NOTIFICATION
        // =====================================

        Notification notification =
                new Notification();

        notification.setTitle("Project Created");

        notification.setMessage(
                savedProject.getTitle()
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

        // Find existing project
        Project project =
                repository.findById(id)
                        .orElse(null);

        // Project does not exist
        if (project == null) {
            return null;
        }

        // =====================================
        // UPDATE BASIC PROJECT DETAILS
        // =====================================

        if (updatedProject.getTitle() != null
                && !updatedProject.getTitle().isBlank()) {

            project.setTitle(
                    updatedProject.getTitle()
            );
        }

        if (updatedProject.getDescription() != null
                && !updatedProject.getDescription().isBlank()) {

            project.setDescription(
                    updatedProject.getDescription()
            );
        }

        if (updatedProject.getTechStack() != null
                && !updatedProject.getTechStack().isBlank()) {

            project.setTechStack(
                    updatedProject.getTechStack()
            );
        }

        // =====================================
        // DEADLINE
        // Preserve existing value if not sent
        // =====================================

        if (updatedProject.getDeadline() != null
                && !updatedProject.getDeadline().isBlank()) {

            project.setDeadline(
                    updatedProject.getDeadline()
            );
        }

        // =====================================
        // PRIORITY
        // =====================================

        if (updatedProject.getPriority() != null
                && !updatedProject.getPriority().isBlank()) {

            project.setPriority(
                    updatedProject.getPriority()
            );
        }

        // =====================================
        // STATUS
        // =====================================

        if (updatedProject.getStatus() != null
                && !updatedProject.getStatus().isBlank()) {

            project.setStatus(
                    updatedProject.getStatus()
            );
        }

        // =====================================
        // USER EMAIL
        // Preserve existing value if not sent
        // =====================================

        if (updatedProject.getUserEmail() != null
                && !updatedProject.getUserEmail().isBlank()) {

            project.setUserEmail(
                    updatedProject.getUserEmail()
            );
        }

        // =====================================
        // TASK COUNTS
        // Only update if values are provided
        // =====================================

        if (updatedProject.getTotalTasks() != null) {

            project.setTotalTasks(
                    updatedProject.getTotalTasks()
            );
        }

        if (updatedProject.getCompletedTasks() != null) {

            project.setCompletedTasks(
                    updatedProject.getCompletedTasks()
            );
        }

        // =====================================
        // SAVE UPDATED PROJECT
        // =====================================

        Project updated =
                repository.save(project);

        // =====================================
        // ACTIVITY
        // =====================================

        Activity activity = new Activity();

        activity.setTitle("Project Updated");

        activity.setDescription(
                updated.getTitle()
                        + " project was updated"
        );

        activity.setColor("green");

        activityRepository.save(activity);

        // =====================================
        // NOTIFICATION
        // =====================================

        Notification notification =
                new Notification();

        notification.setTitle("Project Updated");

        notification.setMessage(
                updated.getTitle()
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

        Project project =
                repository.findById(id)
                        .orElse(null);

        // Project not found
        if (project == null) {
            return "Project not found";
        }

        // Delete project
        repository.deleteById(id);

        // =====================================
        // ACTIVITY
        // =====================================

        Activity activity = new Activity();

        activity.setTitle("Project Deleted");

        activity.setDescription(
                project.getTitle()
                        + " project was deleted"
        );

        activity.setColor("red");

        activityRepository.save(activity);

        // =====================================
        // NOTIFICATION
        // =====================================

        Notification notification =
                new Notification();

        notification.setTitle("Project Deleted");

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
