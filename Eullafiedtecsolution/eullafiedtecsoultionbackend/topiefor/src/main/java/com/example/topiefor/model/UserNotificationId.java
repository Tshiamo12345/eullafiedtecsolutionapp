// UserNotificationId.java
package com.example.topiefor.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserNotificationId implements Serializable {
    private String userId;
    private String notificationId;

    public UserNotificationId() {}

    public UserNotificationId(String userId, String notificationId) {
        this.userId = userId;
        this.notificationId = notificationId;
    }

    // getters, setters, equals, and hashCode

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(String notificationId) {
        this.notificationId = notificationId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserNotificationId)) return false;
        UserNotificationId that = (UserNotificationId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(notificationId, that.notificationId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, notificationId);
    }
}