package com.example.topiefor.controller;

import com.example.topiefor.model.DTO.NotificationDTO;
import com.example.topiefor.model.Notification;
import com.example.topiefor.model.UserNotification;
import com.example.topiefor.service.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eullafied/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;
    private Logger logger = LoggerFactory.getLogger(DocumentController.class);
    // Admin sends a notification to all users
    @PostMapping("/send")
    public ResponseEntity<Notification> sendNotification(@RequestParam String title,
                                         @RequestParam String message,
                                         @RequestParam String senderId,
                                         @RequestParam String type,
                                         @RequestParam String details) {


        return new ResponseEntity<>(notificationService.sendNotificationToAll(title, message, senderId,type,details),HttpStatus.OK);

    }

    // Get all notifications for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationDTO>> getNotificationsForUser(@PathVariable String userId) {
        logger.info("getting data");
        return new ResponseEntity<>(notificationService.getNotificationsForUser(userId), HttpStatus.OK);

    }

    // Mark notification as read/unread for a user
    @PutMapping("/user/{userId}/mark")
    public ResponseEntity<Void> markNotificationReadStatus(@PathVariable String userId,
                                           @RequestParam String notificationId,
                                           @RequestParam boolean read) {
        notificationService.setNotificationReadStatus(userId, notificationId, read);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}