package com.example.topiefor.repository;

import com.example.topiefor.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DocumentRepo extends JpaRepository<Document,String> {


}
