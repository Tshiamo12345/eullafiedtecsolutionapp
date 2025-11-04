package com.example.topiefor.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String applicationId;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private int exprience;

    @Column
    private LocalDateTime openDate;

    @Column
    private LocalDateTime closingDate;
    @JsonIgnore
    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<JobApplication> jobApplications = new ArrayList<>();

    // ✅ No-args constructor required by JPA
    public Application(int exprience) {
        this.exprience = exprience;
    }

    public Application(String applicationId, String title, String description, int exprience, LocalDateTime openDate, LocalDateTime closingDate) {
        this.applicationId = applicationId;
        this.title = title;
        this.description = description;
        this.exprience = exprience;
        this.openDate = openDate;
        this.closingDate = closingDate;
    }

    // ✅ Add getter & setter for jobApplications

    public List<JobApplication> getJobApplications() {
        return jobApplications;
    }

    public void setJobApplications(List<JobApplication> jobApplications) {
        this.jobApplications = jobApplications;
    }

    // rest of getters & setters ...

    public int getExprience() {
        return exprience;
    }

    public void setExprience(int exprience) {
        this.exprience = exprience;
    }

    public String getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(String applicationId) {
        this.applicationId = applicationId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getOpenDate() {
        return openDate;
    }

    public void setOpenDate(LocalDateTime openDate) {
        this.openDate = openDate;
    }

    public LocalDateTime getClosingDate() {
        return closingDate;
    }

    public void setClosingDate(LocalDateTime closingDate) {
        this.closingDate = closingDate;
    }

    @Override
    public String toString() {
        return "Application{" +
                "applicationId='" + applicationId + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", exprience=" + exprience +
                ", openDate=" + openDate +
                ", closingDate=" + closingDate +
                ", jobApplications=" + jobApplications +
                '}';
    }
}
