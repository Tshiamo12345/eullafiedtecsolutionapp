package com.example.topiefor.repository;

import com.example.topiefor.exception.NotFoundException;
import com.example.topiefor.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JobApplicationRepo extends JpaRepository<JobApplication,String> {

    public Optional<JobApplication> findByEmail(String email)throws NotFoundException;
}