package com.example.topiefor.service;


import com.example.topiefor.exception.NotFoundException;
import com.example.topiefor.model.Application;
import com.example.topiefor.repository.ApplicationRepo;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ApplicationService {


    private final ApplicationRepo applicationRepo;

    public ApplicationService(ApplicationRepo applicationRepo){
        this.applicationRepo = applicationRepo;
    }

    @Transactional
    public List<Application> getAllApplications()throws NullPointerException,NotFoundException{

        try{


            List<Application> applications = applicationRepo.findAll();

            if(applications==null){
                throw new NullPointerException();
            }

            for (Application application:applications){

                if(LocalDateTime.now().isAfter(application.getClosingDate())){
                    applications.remove(application);
                }
            }
            return applications;
        }catch(Exception ex){
            throw new NotFoundException();
        }
    }



}
