package com.example.topiefor.exception;

public class SavingException extends RuntimeException{

    private String message;

    public SavingException(){

    }
    public SavingException(String message){
        this.message = message;
    }

    @Override
    public String getMessage(){
        return message;
    }

}
