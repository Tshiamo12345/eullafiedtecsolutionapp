package com.example.topiefor.exception;

public class ServerException extends RuntimeException{

    private String message;

    public ServerException (String message){
        this.message = message;
    }

    public ServerException(){
        message= "Something went wrong with the Server";
    }

    public String getMessage(){
        return message;
    }
}
