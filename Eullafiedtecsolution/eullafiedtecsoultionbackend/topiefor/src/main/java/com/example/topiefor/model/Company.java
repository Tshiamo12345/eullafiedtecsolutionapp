package com.example.topiefor.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

@Entity(name = "company")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "company_id")
    private String companyId;

    @Column(name="company_name")

    private String name;

    @Column(name="description")
    private String description;

    @Column(name="slogan")
    private String slogan;

    @Column(name="culture")
    private String culture;


    @Column(name="email")
    private String email;

    @Column(name="tellphone")
    private String tellPhone;


}
