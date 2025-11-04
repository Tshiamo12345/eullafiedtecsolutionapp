package com.example.topiefor.model.DTO;

import java.time.LocalDateTime;

public class NotificationDTO {

    private String id;
    private String title;
    private String message;
    private boolean read;
    private String detail;
    private String type;
    private LocalDateTime sentTime;

    public NotificationDTO(){

    }

    public NotificationDTO(String id, String title, String message, boolean read, String detail, String type, LocalDateTime sentTime) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.read = read;
        this.detail = detail;
        this.type = type;
        this.sentTime = sentTime;
    }

    public LocalDateTime getSentTime() {
        return sentTime;
    }

    public void setSentTime(LocalDateTime sentTime) {
        this.sentTime = sentTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "NotificationDTO{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", message='" + message + '\'' +
                ", read=" + read +
                ", detail='" + detail + '\'' +
                ", type='" + type + '\'' +
                ", sentTime=" + sentTime +
                '}';
    }
}
