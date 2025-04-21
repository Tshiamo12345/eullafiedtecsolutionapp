package com.example.topiefor.model.DTO;

import com.example.topiefor.model.User;

public class UserTokenDto {

    private String token ;
    private User user;

    public UserTokenDto(){

    }

    public UserTokenDto(String token , User user ){

        this.token = token;
        this.user = user ;
    }


    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
