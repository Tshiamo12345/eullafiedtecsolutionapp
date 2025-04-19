package com.example.topiefor.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.List;


@Entity(name = "company")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "company_id")
    private String companyId;

    @NotNull(message = "Company name is required")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Company name must contain only letters and spaces")
    @Column(name = "company_name", nullable = false)
    private String name;

    @NotNull(message = "Description is required")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Description must contain only letters and spaces")
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull(message = "Slogan is required")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Slogan must contain only letters and spaces")
    @Column(name = "slogan", nullable = false)
    private String slogan;

    @NotNull(message = "Culture is required")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Culture must contain only letters and spaces")
    @Column(name = "culture", nullable = false)
    private String culture;

    @NotNull
    @Email(message = "Should be a valid email")
    @Column(name="email", nullable = false)
    private String email;

    @NotNull(message = "Phone number is required")
    @Pattern(regexp = "\\d+", message = "Phone number must contain only digits")
    @Column(name = "tellphone", nullable = false)
    private String tellPhone;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses;


    public Company(){

    }


    public Company(String companyId, String email , String description , String name , String culture
            , String slogan, String tellPhone,List<Address> addresses){
        this.companyId = companyId;
        this.culture = culture;
        this.email = email;
        this.description = description;
        this.name = name;
        this.slogan = slogan;
        this.tellPhone = tellPhone;
        this.addresses = addresses;
    }
    public String getCompanyId(){
        return companyId;
    }

    public void setCompanyId(String companyId) {
        this.companyId = companyId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSlogan() {
        return slogan;
    }

    public void setSlogan(String slogan) {
        this.slogan = slogan;
    }

    public String getCulture() {
        return culture;
    }

    public void setCulture(String culture) {
        this.culture = culture;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTellPhone() {
        return tellPhone;
    }

    public void setTellPhone(String tellPhone) {
        this.tellPhone = tellPhone;
    }

    public List<Address> getAddresses(){
        return addresses;
    }
    public void setAddresses(List<Address> addresses){
        this.addresses = addresses;
    }



    @Override
    public String toString() {
        return
                "Company{" +
                "companyId='" + companyId + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", slogan='" + slogan + '\'' +
                ", culture='" + culture + '\'' +
                ", email='" + email + '\'' +
                ", tellPhone='" + tellPhone + '\'' +
                ", addresses=" + addresses.toString() +
                '}';

    }

}
