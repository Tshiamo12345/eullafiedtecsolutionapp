package com.example.topiefor.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "location_id", referencedColumnName = "location_id", nullable = false)
    private Location location;

    public Address(){

    }
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    public Address(String city, String country, String postalCode, String province , String streetName,Location location){

        this.city = city;
        this.country = country;
        this.postalCode = postalCode;
        this.province = province;
        this.streetName = streetName;
        this.location = location;
    }

    public Location getLocation() {
        return location;
    }

    public String getAddressId() {
        return addressId;
    }

    public @NotNull @Pattern(regexp = "^[A-Za-z ]+$", message = "Slogan must contain only letters and spaces") String getStreetName() {
        return streetName;
    }

    public void setStreetName(@NotNull @Pattern(regexp = "^[A-Za-z ]+$", message = "Slogan must contain only letters and spaces") String streetName) {
        this.streetName = streetName;
    }

    public @Pattern(regexp = "^[A-Za-z ]+$", message = "Slogan must contain only letters and spaces") String getCity() {
        return city;
    }

    public void setCity(@Pattern(regexp = "^[A-Za-z ]+$", message = "Slogan must contain only letters and spaces") String city) {
        this.city = city;
    }

    public @NotNull @Pattern(regexp = "\\d+", message = "Phone number must contain only digits") String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(@NotNull @Pattern(regexp = "\\d+", message = "Phone number must contain only digits") String postalCode) {
        this.postalCode = postalCode;
    }

    public @NotNull @Pattern(regexp = "^[A-Za-z ]+$", message = "Slogan must contain only letters and spaces") String getProvince() {
        return province;
    }

    public void setProvince(@NotNull @Pattern(regexp = "^[A-Za-z ]+$", message = "Slogan must contain only letters and spaces") String province) {
        this.province = province;
    }

    public @NotNull @Pattern(regexp = "^[A-Za-z ]+$", message = "Slogan must contain only letters and spaces") String getCountry() {
        return country;
    }

    public void setCountry(@NotNull @Pattern(regexp = "^[A-Za-z ]+$", message = "Slogan must contain only letters and spaces") String country) {
        this.country = country;
    }
    @JsonIgnore
    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public void setAddressId(String addressId) {
        this.addressId = addressId;
    }

    @Override
    public String toString() {
        return "Address{" +
                "location=" + location.toString() +
                ", province='" + province + '\'' +
                ", country='" + country + '\'' +
                ", postalCode='" + postalCode + '\'' +
                ", city='" + city + '\'' +
                ", streetName='" + streetName + '\'' +
                ", addressId='" + addressId + '\'' +
                '}';
    }
}
