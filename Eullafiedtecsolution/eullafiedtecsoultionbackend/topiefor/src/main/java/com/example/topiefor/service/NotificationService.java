package com.example.topiefor.service;

import com.example.topiefor.model.*;
import com.example.topiefor.model.DTO.NotificationDTO;
import com.example.topiefor.repository.NotificationRepo;
import com.example.topiefor.repository.UserNotificationRepo;
import com.example.topiefor.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepo notificationRepository;
    @Autowired
    private UserNotificationRepo userNotificationRepository;
    @Autowired
    private UserRepo userRepository;

    // Admin sends notification to all users
    public Notification sendNotificationToAll(String title, String message, String senderId, String type, String details) {

        User sender = userRepository.findById(senderId).orElseThrow();
        Notification notification = new Notification(title, message, LocalDateTime.now(), sender, type, details);
        notification = notificationRepository.save(notification);

        List<User> users = userRepository.findAll();
        for (User user : users) {
            UserNotification userNotification = new UserNotification(user, notification, false, null);
            userNotificationRepository.save(userNotification);
        }
        return notification;
    }

    // Get all notifications for a user, with read status
    public List<NotificationDTO> getNotificationsForUser(String userId) {
        List<UserNotification> userNotifications = userNotificationRepository.findByUser_UserIdOrderByNotification_SentAtDesc(userId);
        List<NotificationDTO> userNotificationDTOList = new ArrayList<>();
        for (UserNotification userNotification : userNotifications) {
            NotificationDTO notificationDTO = new NotificationDTO();
            notificationDTO.setDetail(userNotification.getNotification().getDetails());
            notificationDTO.setId(userNotification.getNotification().getId());
            notificationDTO.setMessage(userNotification.getNotification().getMessage());
            notificationDTO.setType(userNotification.getNotification().getType());
            notificationDTO.setTitle(userNotification.getNotification().getTitle());
            notificationDTO.setRead(userNotification.isRead());
            notificationDTO.setSentTime(userNotification.getNotification().getSentAt());
            userNotificationDTOList.add(notificationDTO);
        }
        return userNotificationDTOList;
    }

    // Mark a notification as read/unread for a user
    public void setNotificationReadStatus(String userId, String notificationId, boolean read) {
        UserNotificationId id = new UserNotificationId(userId, notificationId);
        UserNotification userNotification = userNotificationRepository.findById(id)
                .orElseThrow();
        userNotification.setRead(read);
        userNotification.setReadAt(read ? LocalDateTime.now() : null);
        userNotificationRepository.save(userNotification);
    }
}