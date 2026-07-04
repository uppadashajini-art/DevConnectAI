package com.devconnect.backend.service;

import com.devconnect.backend.entity.Notification;
import com.devconnect.backend.repository.NotificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    // CREATE NOTIFICATION
    public Notification createNotification(
            Notification notification) {

        return notificationRepository
                .save(notification);
    }

    // GET ALL NOTIFICATIONS
    public List<Notification> getAllNotifications() {

        return notificationRepository
                .findAll();
    }

    // DELETE NOTIFICATION
    public void deleteNotification(Long id) {

        notificationRepository
                .deleteById(id);
    }
}