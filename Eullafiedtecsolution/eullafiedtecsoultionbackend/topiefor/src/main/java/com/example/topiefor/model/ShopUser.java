package com.example.topiefor.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity(name = "shop_user")
public class ShopUser {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "product_id")

    private String id;

    private String gmail;

    private String name;

    private LocalDateTime dateOfCreation;

    private LocalDateTime lastLogin;

    private String password;



}
