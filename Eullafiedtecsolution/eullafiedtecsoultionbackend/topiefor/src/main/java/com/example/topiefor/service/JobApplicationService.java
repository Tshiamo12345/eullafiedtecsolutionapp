package com.example.topiefor.service;


import com.example.topiefor.exception.NotFoundException;
import com.example.topiefor.exception.ServerException;
import com.example.topiefor.model.Application;
import com.example.topiefor.model.DTO.JobApplicationDTO;
import com.example.topiefor.model.JobApplication;
import com.example.topiefor.repository.ApplicationRepo;
import com.example.topiefor.repository.JobApplicationRepo;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class JobApplicationService {

    private final JobApplicationRepo jobApplicationRepo;
    private final ApplicationRepo applicationRepo;

    public  JobApplicationService(JobApplicationRepo jobApplicationRepo,ApplicationRepo applicationRepo){
        this.jobApplicationRepo = jobApplicationRepo;
        this.applicationRepo = applicationRepo;
    }

    @Transactional
    public JobApplication addJobApplication(JobApplicationDTO jobApplicationDTO)throws ServerException, NotFoundException {

        try{
            //Checking if the application already Exist by
            Optional<JobApplication> isOptional=jobApplicationRepo.findByEmail(jobApplicationDTO.getEmail());
            if(isOptional.isEmpty()) {

                Application application = applicationRepo.getReferenceById(jobApplicationDTO.getApplicationId());
                JobApplication jobApplication = new JobApplication();
                jobApplication.setApplication(application);
                jobApplication.setEmail(jobApplicationDTO.getEmail());
                jobApplication.setName(jobApplicationDTO.getName());
                jobApplication.setResume(jobApplicationDTO.getResume());
                jobApplication.setAppliedDate(LocalDateTime.now());
                return jobApplicationRepo.save(jobApplication);

            }
            return null;

        }catch(Exception ex){
            throw new ServerException("");
        }
    }


}
