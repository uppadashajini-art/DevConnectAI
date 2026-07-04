package com.devconnect.backend.service;

import com.devconnect.backend.entity.Task;
import com.devconnect.backend.entity.Activity;
import com.devconnect.backend.entity.Notification;

import com.devconnect.backend.repository.TaskRepository;
import com.devconnect.backend.repository.ActivityRepository;
import com.devconnect.backend.repository.NotificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repository;

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    // =========================================
    // CREATE TASK
    // =========================================
    public Task createTask(Task task) {

        Task savedTask =
                repository.save(task);

        // SAVE ACTIVITY
        Activity activity =
                new Activity();

        activity.setTitle(
                "New Task Created");

        activity.setDescription(
                task.getTitle() +
                " task was created"
        );

        activity.setColor("blue");

        activityRepository.save(activity);

        // SAVE NOTIFICATION
        Notification notification =
                new Notification();

        notification.setTitle(
                "Task Created");

        notification.setMessage(
                task.getTitle() +
                " task was created"
        );

        notification.setType("task");

        notification.setTime("Just Now");

        notificationRepository.save(notification);

        return savedTask;
    }

    // =========================================
    // GET ALL TASKS
    // ADMIN & PROJECT_MANAGER
    // =========================================
    public List<Task> getAllTasks() {

        return repository.findAll();
    }

    // =========================================
    // GET TASKS BY USER EMAIL
    // TEAM_MEMBER
    // =========================================
    public List<Task> getAllTasks(
            String userEmail) {

        return repository.findByUserEmail(
                userEmail);
    }

    // =========================================
    // GET TASK BY ID
    // =========================================
    public Optional<Task> getTaskById(
            Long id) {

        return repository.findById(id);
    }

    // =========================================
    // UPDATE TASK
    // =========================================
    public Task updateTask(
            Long id,
            Task updatedTask) {

        Task task =
                repository.findById(id)
                .orElse(null);

        if (task != null) {

            task.setTitle(
                    updatedTask.getTitle());

            task.setDescription(
                    updatedTask.getDescription());

            task.setStatus(
                    updatedTask.getStatus());

            task.setDueDate(
                    updatedTask.getDueDate());

            task.setAssignedTo(
                    updatedTask.getAssignedTo());

            task.setUserEmail(
                    updatedTask.getUserEmail());

            task.setProjectId(
                    updatedTask.getProjectId());

            Task updated =
                    repository.save(task);

            // SAVE ACTIVITY
            Activity activity =
                    new Activity();

            activity.setTitle(
                    "Task Updated");

            activity.setDescription(
                    task.getTitle() +
                    " task was updated"
            );

            activity.setColor("green");

            activityRepository.save(activity);

            // SAVE NOTIFICATION
            Notification notification =
                    new Notification();

            notification.setTitle(
                    "Task Updated");

            notification.setMessage(
                    task.getTitle() +
                    " task was updated"
            );

            notification.setType("task");

            notification.setTime("Just Now");

            notificationRepository.save(notification);

            return updated;
        }

        return null;
    }

    // =========================================
    // DELETE TASK
    // =========================================
    public String deleteTask(Long id) {

        repository.deleteById(id);

        // SAVE ACTIVITY
        Activity activity =
                new Activity();

        activity.setTitle(
                "Task Deleted");

        activity.setDescription(
                "A task was deleted"
        );

        activity.setColor("red");

        activityRepository.save(activity);

        // SAVE NOTIFICATION
        Notification notification =
                new Notification();

        notification.setTitle(
                "Task Deleted");

        notification.setMessage(
                "A task was deleted"
        );

        notification.setType("task");

        notification.setTime("Just Now");

        notificationRepository.save(notification);

        return "Task Deleted Successfully";
    }
}