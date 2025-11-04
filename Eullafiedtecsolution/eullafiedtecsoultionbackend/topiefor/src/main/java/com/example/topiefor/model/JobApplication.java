package com.example.topiefor.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDateTime;
import java.util.Arrays;

@Entity
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "application_id")  // FK column in JobApplication table
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Application application;

    @Column
    private LocalDateTime appliedDate;

    @Column
    private String name;

    @Column
    private String email;

    @Lob
    @Column(name = "resume", columnDefinition = "BLOB")
    private byte[] resume;

    // No-args constructor
    public JobApplication() {
    }

    public JobApplication(String id, Application application, LocalDateTime appliedDate, String name, String email,
                          byte[] resume) {
        this.id = id;
        this.application = application;
        this.appliedDate = appliedDate;
        this.name = name;
        this.email = email;
        this.resume = resume;
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Application getApplication() {
        return application;
    }

    public void setApplication(Application application) {
        this.application = application;
    }

    public LocalDateTime getAppliedDate() {
        return appliedDate;
    }

    public void setAppliedDate(LocalDateTime appliedDate) {
        this.appliedDate = appliedDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public byte[] getResume() {
        return resume;
    }

    public void setResume(byte[] resume) {
        this.resume = resume;
    }

    @Override
    public String toString() {
        
        return "JobApplication{" +
                "id='" + id + '\'' +
                ", application=" + application +
                ", appliedDate=" + appliedDate +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", resume=" + Arrays.toString(resume) +
                '}';
    }
}
