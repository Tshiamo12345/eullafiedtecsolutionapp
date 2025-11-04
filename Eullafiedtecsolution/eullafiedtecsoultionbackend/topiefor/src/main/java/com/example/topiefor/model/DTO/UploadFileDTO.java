package com.example.topiefor.model.DTO;

import org.springframework.web.multipart.MultipartFile;

public class UploadFileDTO {

    private String name;

    private String userId;

    private MultipartFile file;


    public UploadFileDTO(String name, String userId, MultipartFile file) {
        this.name = name;
        this.userId = userId;
        this.file = file;
    }

    public UploadFileDTO(){

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public MultipartFile getFile() {
        return file;
    }


    public void setFile(MultipartFile file) {
        this.file = file;
    }

    @Override
    public String toString() {
        return "UploadFileDTO{" +
                "name='" + name + '\'' +
                ", userId='" + userId + '\'' +
                ", file=" + file +
                '}';
    }
}
