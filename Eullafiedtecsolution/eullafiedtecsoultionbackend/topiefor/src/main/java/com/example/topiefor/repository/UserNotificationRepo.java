package com.example.topiefor.repository;

import com.example.topiefor.model.UserNotification;
import com.example.topiefor.model.UserNotificationId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface UserNotificationRepo extends JpaRepository<UserNotification, UserNotificationId> {
    List<UserNotification> findByUser_UserIdOrderByNotification_SentAtDesc(String userId);
}