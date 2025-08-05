package com.example.topiefor.controller;

import com.example.topiefor.exception.NotFoundException;
import com.example.topiefor.exception.ServerException;
import com.example.topiefor.model.DTO.JobApplicationDTO;
import com.example.topiefor.model.JobApplication;
import com.example.topiefor.service.JobApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/eullafied/jobapplication")
@CrossOrigin
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    public JobApplicationController(JobApplicationService jobApplicationService){
        this.jobApplicationService = jobApplicationService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<JobApplication> createJobApplication(
            @RequestPart("name") String name,
            @RequestPart("email") String email,
            @RequestPart("applicationId") String applicationId,
            @RequestPart("resume") MultipartFile resume) {

        try {
            JobApplicationDTO jobApplicationDTO = new JobApplicationDTO();
            byte[] resumeInBytes = resume.getBytes();
            jobApplicationDTO.setApplicationId(applicationId);
            jobApplicationDTO.setEmail(email);
            jobApplicationDTO.setResume(resumeInBytes);
            jobApplicationDTO.setName(name);
            JobApplication jobApplication = jobApplicationService.addJobApplication(jobApplicationDTO);
            return new ResponseEntity<>(jobApplication, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } catch (ServerException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

}
