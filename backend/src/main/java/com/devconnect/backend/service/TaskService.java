package com.devconnect.backend.service;

import com.devconnect.backend.entity.Activity;
import com.devconnect.backend.entity.Notification;
import com.devconnect.backend.entity.Project;
import com.devconnect.backend.entity.Task;

import com.devconnect.backend.repository.ActivityRepository;
import com.devconnect.backend.repository.NotificationRepository;
import com.devconnect.backend.repository.ProjectRepository;
import com.devconnect.backend.repository.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private NotificationRepository notificationRepository;


    // =========================================================
    // CREATE TASK
    // =========================================================

    public Task createTask(Task task) {

        // -----------------------------------------------------
        // Validate project
        // -----------------------------------------------------

        if (task.getProjectId() == null) {
            throw new RuntimeException("Project ID is required");
        }

        Project project = projectRepository
                .findById(task.getProjectId())
                .orElseThrow(() ->
                        new RuntimeException("Project not found")
                );


        // -----------------------------------------------------
        // Save task
        // -----------------------------------------------------

        Task savedTask = repository.save(task);


        // -----------------------------------------------------
        // Update project task count
        // -----------------------------------------------------

        updateProjectTaskCount(project.getId());


        // -----------------------------------------------------
        // Activity
        // -----------------------------------------------------

        Activity activity = new Activity();

        activity.setTitle("New Task Created");

        activity.setDescription(
                task.getTitle()
                        + " task was created in "
                        + project.getTitle()
        );

        activity.setColor("blue");

        activityRepository.save(activity);


        // -----------------------------------------------------
        // Notification
        // -----------------------------------------------------

        Notification notification = new Notification();

        notification.setTitle("Task Created");

        notification.setMessage(
                task.getTitle()
                        + " task was created"
        );

        notification.setType("task");

        notification.setTime("Just Now");

        notificationRepository.save(notification);


        return savedTask;
    }


    // =========================================================
    // GET ALL TASKS
    // =========================================================

    public List<Task> getAllTasks() {

        return repository.findAll();
    }


    // =========================================================
    // GET TASKS BY USER EMAIL
    // =========================================================

    public List<Task> getAllTasks(String userEmail) {

        return repository.findByUserEmail(userEmail);
    }


    // =========================================================
    // GET TASKS BY PROJECT
    // =========================================================

    public List<Task> getTasksByProjectId(Long projectId) {

        return repository.findByProjectId(projectId);
    }


    // =========================================================
    // GET TASK BY ID
    // =========================================================

    public Optional<Task> getTaskById(Long id) {

        return repository.findById(id);
    }


    // =========================================================
    // UPDATE TASK
    // =========================================================

    public Task updateTask(
            Long id,
            Task updatedTask) {

        Task task = repository
                .findById(id)
                .orElse(null);

        if (task == null) {
            return null;
        }


        // -----------------------------------------------------
        // Remember old project ID
        // -----------------------------------------------------

        Long oldProjectId = task.getProjectId();

        Long newProjectId = updatedTask.getProjectId();


        // -----------------------------------------------------
        // Validate new project
        // -----------------------------------------------------

        if (newProjectId == null) {
            throw new RuntimeException("Project ID is required");
        }

        projectRepository
                .findById(newProjectId)
                .orElseThrow(() ->
                        new RuntimeException("Project not found")
                );


        // -----------------------------------------------------
        // Update task fields
        // -----------------------------------------------------

        task.setTitle(
                updatedTask.getTitle()
        );

        task.setDescription(
                updatedTask.getDescription()
        );

        task.setStatus(
                updatedTask.getStatus()
        );

        task.setDueDate(
                updatedTask.getDueDate()
        );

        task.setAssignedTo(
                updatedTask.getAssignedTo()
        );

        task.setUserEmail(
                updatedTask.getUserEmail()
        );

        task.setProjectId(
                updatedTask.getProjectId()
        );


        // -----------------------------------------------------
        // Save updated task
        // -----------------------------------------------------

        Task updated = repository.save(task);


        // -----------------------------------------------------
        // Update new project count
        // -----------------------------------------------------

        updateProjectTaskCount(newProjectId);


        // -----------------------------------------------------
        // If task moved from another project,
        // update old project also
        // -----------------------------------------------------

        if (oldProjectId != null
                && !oldProjectId.equals(newProjectId)) {

            updateProjectTaskCount(oldProjectId);
        }


        // -----------------------------------------------------
        // Activity
        // -----------------------------------------------------

        Activity activity = new Activity();

        activity.setTitle("Task Updated");

        activity.setDescription(
                task.getTitle()
                        + " task was updated"
        );

        activity.setColor("green");

        activityRepository.save(activity);


        // -----------------------------------------------------
        // Notification
        // -----------------------------------------------------

        Notification notification = new Notification();

        notification.setTitle("Task Updated");

        notification.setMessage(
                task.getTitle()
                        + " task was updated"
        );

        notification.setType("task");

        notification.setTime("Just Now");

        notificationRepository.save(notification);


        return updated;
    }


    // =========================================================
    // DELETE TASK
    // =========================================================

    public String deleteTask(Long id) {

        Task task = repository
                .findById(id)
                .orElse(null);

        if (task == null) {
            return "Task not found";
        }


        // -----------------------------------------------------
        // Remember project ID before deleting
        // -----------------------------------------------------

        Long projectId = task.getProjectId();


        // -----------------------------------------------------
        // Delete task
        // -----------------------------------------------------

        repository.deleteById(id);


        // -----------------------------------------------------
        // Update project count
        // -----------------------------------------------------

        if (projectId != null) {

            updateProjectTaskCount(projectId);
        }


        // -----------------------------------------------------
        // Activity
        // -----------------------------------------------------

        Activity activity = new Activity();

        activity.setTitle("Task Deleted");

        activity.setDescription(
                task.getTitle()
                        + " task was deleted"
        );

        activity.setColor("red");

        activityRepository.save(activity);


        // -----------------------------------------------------
        // Notification
        // -----------------------------------------------------

        Notification notification = new Notification();

        notification.setTitle("Task Deleted");

        notification.setMessage(
                task.getTitle()
                        + " task was deleted"
        );

        notification.setType("task");

        notification.setTime("Just Now");

        notificationRepository.save(notification);


        return "Task Deleted Successfully";
    }


    // =========================================================
    // UPDATE PROJECT TASK COUNT
    // =========================================================

    private void updateProjectTaskCount(Long projectId) {

        Project project = projectRepository
                .findById(projectId)
                .orElse(null);

        if (project == null) {
            return;
        }


        // Get all tasks belonging to this project

        List<Task> projectTasks =
                repository.findByProjectId(projectId);


        // Total number of tasks

        int totalTasks =
                projectTasks.size();


        // Count completed tasks

        int completedTasks = 0;

        for (Task task : projectTasks) {

            if (task.getStatus() != null
                    && task.getStatus()
                    .equalsIgnoreCase("Completed")) {

                completedTasks++;
            }
        }


        // -----------------------------------------------------
        // Update Project
        // -----------------------------------------------------

        project.setTotalTasks(totalTasks);

        project.setCompletedTasks(completedTasks);


        // Save project

        projectRepository.save(project);
    }
}