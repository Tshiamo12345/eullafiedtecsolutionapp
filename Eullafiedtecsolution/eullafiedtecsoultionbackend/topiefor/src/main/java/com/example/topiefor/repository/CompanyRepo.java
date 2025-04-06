package com.example.topiefor.repository;

import com.example.topiefor.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepo extends JpaRepository<Company,String> {


    Optional<Company> findByName(String name);
    Optional<Company> findBySlogan(String name);
    @Query ("SELECT c FROM company c JOIN FETCH c.addresses a JOIN FETCH a.location WHERE c.companyId = :companyId")
    Optional<Company> findByIdWithAddressesAndLocation(@Param("companyId") String companyId);
}
