package com.example.topiefor.controller;

import com.example.topiefor.model.Application;
import com.example.topiefor.service.ApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/eullafied/application")
@CrossOrigin()
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService){
        this.applicationService = applicationService;
    }

    @GetMapping
    public ResponseEntity<List<Application>> getAllApplications(){

        try{
            List<Application> applications = applicationService.getAllApplications();
            return new ResponseEntity<>(applications, HttpStatus.OK);
        }catch(Exception exception){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
