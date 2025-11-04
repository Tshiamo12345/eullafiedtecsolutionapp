package com.example.topiefor.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    private String userId;

    @NotNull(message = "name can`t be null")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "name can only contain letters and spaces")
    @Column(name = "name", nullable = false)
    private String name;
    @NotNull
    @Pattern(regexp = "^[A-za-z]+$", message = "surname can only contain letters and spaces")
    @Column(name = "surname", nullable = false)
    private String surname;
    @NotNull
    @Column(name = "email", nullable = false)

    private String email;

    @Column(name = "phone", nullable = false)
    private String phone;

    private String status;

    @Column(name = "bio", nullable = false)
    private String bio;

    @Column(name = "username")
    private String username;

    private LocalDateTime dateOfCreation;

    private LocalDateTime lastLogin;

    private LocalDateTime lastUpdateProfile;

    private String department;

    @Lob
    @Column(name = "profile_picture", columnDefinition = "MEDIUMBLOB")
    private byte[] profilePicture;

    @NotNull
    private String password;


    private int failedAttemptCount;

    private LocalDateTime lockTime;

    @NotNull
    private String role;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user")
    private Address address;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Document> uploads;

    public User() {

    }

    public List<Document> getUploads() {
        return uploads;
    }

    public void setUploads(List<Document> uploads) {
        this.uploads = uploads;
    }

    public User(String user_id, String name, String surname, String email, String status,
                String username, LocalDateTime dateOfCreation, LocalDateTime lastLogin,
                LocalDateTime lastUpdateProfile, byte[] profilePicture, String password,
                int failedAttemptCount, LocalDateTime lockTime, String role, Address address, String phone
            , String bio, String department, List<Document> uploads) {
        this.userId = user_id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.status = status;
        this.username = username;
        this.dateOfCreation = dateOfCreation;
        this.lastLogin = lastLogin;
        this.lastUpdateProfile = lastUpdateProfile;
        this.profilePicture = profilePicture;
        this.password = password;
        this.failedAttemptCount = failedAttemptCount;
        this.lockTime = lockTime;
        this.role = role;
        this.address = address;
        this.uploads = uploads;
        this.phone = phone;
        this.bio = bio;
        this.department = department;
    }

    public @NotNull String getRole() {
        return role;
    }

    public void setRole(@NotNull String role) {
        this.role = role;
    }

    public int getFailedAttemptCount() {
        return failedAttemptCount;
    }

    public void setFailedAttemptCount(int failedAttemptCount) {
        this.failedAttemptCount = failedAttemptCount;
    }

    public LocalDateTime getLockTime() {
        return lockTime;
    }

    public void setLockTime(LocalDateTime lockTime) {
        this.lockTime = lockTime;
    }

    public String getUser_id() {
        return userId;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setUser_id(String user_id) {
        this.userId = user_id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public @Pattern(regexp = "^[A-Za-z ]+$", message = "name can only contain letters and spaces") String getName() {
        return name;
    }

    public void setName(@Pattern(regexp = "^[A-Za-z ]+$", message = "name can only contain letters and spaces") String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public @Pattern(regexp = "^[A-za-z]+$", message = "surname can only contain letters and spaces") String getSurname() {
        return surname;
    }

    public void setSurname(@Pattern(regexp = "^[A-za-z]+$", message = "surname can only contain letters and spaces") String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDateTime getDateOfCreation() {
        return dateOfCreation;
    }

    public void setDateOfCreation(LocalDateTime dateOfCreation) {
        this.dateOfCreation = dateOfCreation;
    }

    public LocalDateTime getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(LocalDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }

    public LocalDateTime getLastUpdateProfile() {
        return lastUpdateProfile;
    }

    public void setLastUpdateProfile(LocalDateTime lastUpdateProfile) {
        this.lastUpdateProfile = lastUpdateProfile;
    }


    public byte[] getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(@NotNull String password) {
        this.password = password;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }


    @Override
    public String toString() {
        return "User{" +
                "user_id='" + userId + '\'' +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", email='" + email + '\'' +
                ", status='" + status + '\'' +
                ", username='" + username + '\'' +
                ", dateOfCreation=" + dateOfCreation +
                ", lastLogin=" + lastLogin +
                ", department=" + department +
                ", lastUpdateProfile=" + lastUpdateProfile +
                ", profilePictureSize=" + (profilePicture != null ? profilePicture.length : 0) +
                ", failedAttemptCount=" + failedAttemptCount +
                ", lockTime=" + lockTime +
                ", phone=" + phone +
                ", bio=" + bio +
                ", role='" + role + '\'' +
                ", address=" + address +
                ", uploadsCount=" + (uploads != null ? uploads.size() : 0) +
                '}';
    }
}
