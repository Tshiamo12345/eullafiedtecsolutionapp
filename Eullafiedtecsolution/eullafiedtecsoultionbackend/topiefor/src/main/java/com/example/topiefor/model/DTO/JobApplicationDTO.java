package com.example.topiefor.model.DTO;

import java.util.Arrays;

public class JobApplicationDTO {

    private String applicationId;

    private byte[] resume;

    private String name;

    private String email;

    public JobApplicationDTO(String applicationId, byte[] resume, String name, String email) {
        this.applicationId = applicationId;
        this.resume = resume;
        this.name = name;
        this.email = email;
    }

    public JobApplicationDTO(){

    }

    public String getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(String applicationId) {
        this.applicationId = applicationId;
    }

    public byte[] getResume() {
        return resume;
    }

    public void setResume(byte[] resume) {
        this.resume = resume;
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

    @Override
    public String toString() {
        return "JobApplicationDTO{" +
                "applicationId='" + applicationId + '\'' +
                ", resume=" + Arrays.toString(resume) +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
