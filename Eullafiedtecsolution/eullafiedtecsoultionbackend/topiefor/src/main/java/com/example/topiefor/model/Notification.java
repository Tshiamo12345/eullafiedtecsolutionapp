package com.example.topiefor.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String message;

    @ManyToMany
    private List<User> users;

    private LocalDateTime sendTime;

    // Renamed from 'read' to 'isRead'
    private String isRead;

    public Notification(String id, String message, List<User> users, String isRead) {
        this.id = id;
        this.message = message;
        this.users = users;
        this.isRead = isRead;
    }

    // You may also want a default constructor!
    public Notification() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public LocalDateTime getSendTime() {
        return sendTime;
    }

    public void setSendTime(LocalDateTime sendTime) {
        this.sendTime = sendTime;
    }

    public String getIsRead() {
        return isRead;
    }

    public void setIsRead(String isRead) {
        this.isRead = isRead;
    }

    @Override
    public String toString() {
        return "Notification{" +
                "id='" + id + '\'' +
                ", message='" + message + '\'' +
                ", users=" + users +
                ", isRead='" + isRead + '\'' +
                '}';
    }
}