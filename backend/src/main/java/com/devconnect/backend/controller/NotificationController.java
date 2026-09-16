package com.devconnect.backend.controller;

import com.devconnect.backend.entity.Notification;
import com.devconnect.backend.service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // =========================================
    // CREATE NOTIFICATION
    // =========================================
    @PostMapping
    public ResponseEntity<Notification> createNotification(
            @RequestBody Notification notification) {

        Notification createdNotification =
                notificationService.createNotification(
                        notification
                );

        return ResponseEntity.ok(createdNotification);
    }

    // =========================================
    // GET ALL NOTIFICATIONS
    // =========================================
    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {

        List<Notification> notifications =
                notificationService.getAllNotifications();

        return ResponseEntity.ok(notifications);
    }

    // =========================================
    // DELETE NOTIFICATION
    // =========================================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNotification(
            @PathVariable Long id) {

        notificationService.deleteNotification(id);

        return ResponseEntity.ok(
                "Notification deleted successfully"
        );
    }
}