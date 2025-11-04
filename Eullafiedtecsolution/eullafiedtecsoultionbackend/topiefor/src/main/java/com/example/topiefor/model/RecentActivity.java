package com.example.topiefor.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

@Entity
public class RecentActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String recentActivityId;

    @Column()
    @NotNull()
    private String name;
    @Column
    @NotNull
    private LocalDateTime recentDate;

    @Column
    @NotNull
    private String userId;

    public RecentActivity(){

    }
    public RecentActivity(String name,LocalDateTime recentDate,String userId){
        this.recentDate = recentDate;
        this.name = name;
        this.userId = userId;
    }

    public String getRecentActivityId() {
        return recentActivityId;
    }

    public void setRecentActivityId(String recentActivityId) {
        this.recentActivityId = recentActivityId;
    }

    public @NotNull String getUserId() {
        return userId;
    }

    public void setUserId(@NotNull String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getRecentDate() {
        return recentDate;
    }

    public void setRecentDate(LocalDateTime recentDate) {
        this.recentDate = recentDate;
    }

    @Override
    public String toString() {
        return "RecentActivity{" +
                "name='" + name + '\'' +
                ", recentDate=" + recentDate +
                '}';
    }
}
