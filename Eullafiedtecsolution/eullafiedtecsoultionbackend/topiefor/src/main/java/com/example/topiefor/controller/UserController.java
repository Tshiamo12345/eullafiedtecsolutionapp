package com.example.topiefor.controller;

import com.example.topiefor.exception.NotAuthorizedException;
import com.example.topiefor.exception.NotFoundException;
import com.example.topiefor.exception.ServerException;
import com.example.topiefor.model.DTO.UserLoginDTO;
import com.example.topiefor.model.DTO.UserTokenDto;
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

    @PostMapping("/login")
    public ResponseEntity<UserTokenDto> LoginUser(@RequestBody UserLoginDTO userLoginDTO){

        try {
            UserTokenDto userTokenDto = userService.userLogin(userLoginDTO);
            return new ResponseEntity<>(userTokenDto,HttpStatus.OK);

        } catch (NotAuthorizedException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }catch(Exception ex){
            try {
                userService.incrementFailedAttempt(userLoginDTO.getUsername());
            } catch (NotAuthorizedException e) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            } catch (NotFoundException e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }



}
