package com.devconnect.backend.controller;

import com.devconnect.backend.entity.Notification;
import com.devconnect.backend.service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // CREATE NOTIFICATION
    @PostMapping
    public Notification createNotification(
            @RequestBody Notification notification) {

        return notificationService
                .createNotification(notification);
    }

    // GET ALL NOTIFICATIONS
    @GetMapping
    public List<Notification> getAllNotifications() {

        return notificationService
                .getAllNotifications();
    }

    // DELETE NOTIFICATION
    @DeleteMapping("/{id}")
    public void deleteNotification(
            @PathVariable Long id) {

        notificationService
                .deleteNotification(id);
    }
}