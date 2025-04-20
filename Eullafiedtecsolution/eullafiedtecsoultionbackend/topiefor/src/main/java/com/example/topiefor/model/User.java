package com.example.topiefor.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDateTime;
import java.util.Arrays;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    private String user_id;

    @NotNull(message = "name can`t be null")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "name can only contain letters and spaces")
    @Column(name = "name" , nullable = false)
    private String name;
    @NotNull
    @Pattern(regexp = "^[A-za-z]+$", message = "surname can only contain letters and spaces")
    @Column(name = "surname",nullable = false)
    private String surname;
    @NotNull
    @Column(name = "email",nullable = false)
    private String email;
    @NotNull
    @Column(name = "username")
    private String username;
    @NotNull
    private LocalDateTime dateOfCreation;
    private LocalDateTime lastLogin;
    @NotNull
    private LocalDateTime lastUpdateProfile;
    @NotNull
    private byte[] profilePicture;
    @NotNull
    private String password;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user")
    private Address address;


    public User(){

    }

    public User(String user_id, String name, String surname, String email,
                String username, LocalDateTime dateOfCreation,
                LocalDateTime lastLogin, LocalDateTime lastUpdateProfile,
                byte[] profilePicture, String password,
                Address address) {

        this.user_id = user_id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.username = username;
        this.dateOfCreation = dateOfCreation;
        this.lastLogin = lastLogin;
        this.lastUpdateProfile = lastUpdateProfile;
        this.profilePicture = profilePicture;
        this.password = password;
        this.address = address;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public @NotNull(message = "name can`t be null") @Pattern(regexp = "^[A-Za-z ]+$", message = "name can only contain letters and spaces") String getName() {
        return name;
    }

    public void setName(@NotNull(message = "name can`t be null") @Pattern(regexp = "^[A-Za-z ]+$", message = "name can only contain letters and spaces") String name) {
        this.name = name;
    }

    public @NotNull @Pattern(regexp = "^[A-za-z]+$", message = "surname can only contain letters and spaces") String getSurname() {
        return surname;
    }

    public void setSurname(@NotNull @Pattern(regexp = "^[A-za-z]+$", message = "surname can only contain letters and spaces") String surname) {
        this.surname = surname;
    }

    public @NotNull String getEmail() {
        return email;
    }

    public void setEmail(@NotNull String email) {
        this.email = email;
    }

    public @NotNull String getUsername() {
        return username;
    }

    public void setUsername(@NotNull String username) {
        this.username = username;
    }

    public @NotNull LocalDateTime getDateOfCreation() {
        return dateOfCreation;
    }

    public void setDateOfCreation(@NotNull LocalDateTime dateOfCreation) {
        this.dateOfCreation = dateOfCreation;
    }

    public LocalDateTime getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(LocalDateTime lastLogin) {
        this.lastLogin = lastLogin;
    }

    public @NotNull LocalDateTime getLastUpdateProfile() {
        return lastUpdateProfile;
    }

    public void setLastUpdateProfile(@NotNull LocalDateTime lastUpdateProfile) {
        this.lastUpdateProfile = lastUpdateProfile;
    }

    @NotNull
    public byte[] getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(@NotNull byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }

    public @NotNull String getPassword() {
        return password;
    }

    public void setPassword(@NotNull String password) {
        this.password = password;
    }

    public @NotNull Address getAddress() {
        return address;
    }

    public void setAddress(@NotNull Address address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "User{" +
                "user_id='" + user_id + '\'' +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", dateOfCreation=" + dateOfCreation +
                ", lastLogin=" + lastLogin +
                ", lastUpdateProfile=" + lastUpdateProfile +
                ", profilePicture=" + Arrays.toString(profilePicture) +
                ", password='" + password + '\'' +
                ", address=" + address +
                '}';
    }
}
