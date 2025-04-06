package com.example.topiefor.exception;

public class AlreadyExistException extends RuntimeException{

    private String message;

    public AlreadyExistException(){


    }
    public AlreadyExistException(String message){
        this.message=message;
    }
}
