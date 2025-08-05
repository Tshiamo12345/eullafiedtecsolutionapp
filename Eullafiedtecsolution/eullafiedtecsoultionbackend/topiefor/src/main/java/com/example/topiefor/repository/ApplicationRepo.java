package com.example.topiefor.repository;

import com.example.topiefor.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ApplicationRepo extends JpaRepository<Application,String> {


}
