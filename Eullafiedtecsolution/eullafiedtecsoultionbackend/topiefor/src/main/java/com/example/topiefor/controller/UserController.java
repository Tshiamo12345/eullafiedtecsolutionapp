package com.example.topiefor.controller;

import com.example.topiefor.exception.NotFoundException;
import com.example.topiefor.exception.ServerException;
import com.example.topiefor.model.DTO.UserLoginDTO;
import com.example.topiefor.model.User;
import com.example.topiefor.service.UserService;
import org.slf4j.ILoggerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/eullafied/user")
@CrossOrigin()
public class UserController {

    private final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/login")
    public String  LoginUser(@RequestBody UserLoginDTO userLoginDTO){


           return userService.userLogin(userLoginDTO);

    }

}
