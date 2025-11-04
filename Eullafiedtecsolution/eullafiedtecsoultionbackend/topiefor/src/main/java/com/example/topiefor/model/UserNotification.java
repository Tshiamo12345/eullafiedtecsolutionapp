// UserNotification.java
package com.example.topiefor.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class UserNotification {

    @EmbeddedId
    private UserNotificationId id = new UserNotificationId();

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("notificationId")
    @JoinColumn(name = "notification_id")
    private Notification notification;

    @Column(name = "is_read")
    private boolean read;
    private LocalDateTime readAt;

    public UserNotification() {}

    public UserNotification(User user, Notification notification, boolean read, LocalDateTime readAt) {
        this.user = user;
        this.notification = notification;
        this.read = read;
        this.readAt = readAt;
        this.id = new UserNotificationId(user.getUser_id(), notification.getId());
    }

    public UserNotificationId getId() {
        return id;
    }

    public void setId(UserNotificationId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Notification getNotification() {
        return notification;
    }

    public void setNotification(Notification notification) {
        this.notification = notification;
    }

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    public LocalDateTime getReadAt() {
        return readAt;
    }

    public void setReadAt(LocalDateTime readAt) {
        this.readAt = readAt;
    }

}