package com.example.topiefor.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Arrays;

@Entity
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;


    private String fileName;
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] file;

    private LocalDateTime localDateTime;



    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Document(String fileName, byte[] file, LocalDateTime localDateTime,  User user) {

        this.fileName = fileName;
        this.file = file;
        this.localDateTime = localDateTime;

        this.user = user;
    }

    public Document(){

    }



    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }

    public LocalDateTime getLocalDateTime() {
        return localDateTime;
    }

    public void setLocalDateTime(LocalDateTime localDateTime) {
        this.localDateTime = localDateTime;
    }

    @Override
    public String toString() {
        return "Document{" +
                "id='" + id + '\'' +
                "localDateTime='" + localDateTime + '\'' +
                ", fileName='" + fileName + '\'' +
                ", fileSize=" + (file != null ? file.length : 0) +
                ", userId=" + (user != null ? user.getUser_id() : "null") +
                '}';
    }
}
