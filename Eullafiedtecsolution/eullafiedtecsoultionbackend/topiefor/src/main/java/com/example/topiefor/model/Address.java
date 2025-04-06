package com.example.topiefor.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity(name = "address")
@Getter
@Setter
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "address_id")
    private String addressId;

    @NotNull
    @Column(name = "street_name",nullable = false)
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Slogan must contain only letters and spaces")
    private String streetName;

    @Column(name="city",nullable = false)
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Slogan must contain only letters and spaces")
    private String city;

    @NotNull
    @Column(name = "postal_code",nullable = false)
    @Pattern(regexp = "\\d+", message = "Phone number must contain only digits")
    private String postalCode;

    @NotNull
    @Column(name="province",nullable = false)
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Slogan must contain only letters and spaces")
    private String province;

    @NotNull
    @Column(name = "country",nullable = false)
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Slogan must contain only letters and spaces")
    private String country;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    public Address(){

    }
    public Address(String city, String country, String postalCode, String province , String streetName, List<Address> address){

        this.city = city;
        this.country = country;
        this.postalCode = postalCode;
        this.province = province;
        this.streetName = streetName;

    }



}
