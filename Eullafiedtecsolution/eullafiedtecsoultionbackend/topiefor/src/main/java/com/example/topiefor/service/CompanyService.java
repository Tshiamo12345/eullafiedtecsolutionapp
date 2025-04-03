package com.example.topiefor.service;


import com.example.topiefor.exception.NotFoundException;
import com.example.topiefor.exception.SavingException;
import com.example.topiefor.exception.ServerException;
import com.example.topiefor.model.Company;
import com.example.topiefor.repository.CompanyRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

public class CompanyService {

    private final String message = "Something went wrong with server method";

    private final Logger logger = LoggerFactory.getLogger(CompanyService.class);

    private final CompanyRepo companyRepo;


    public CompanyService(CompanyRepo companyRepo) {
        this.companyRepo = companyRepo;
    }


    public Company getCompanyDetails() throws NotFoundException,ServerException {

        try {

            Optional<Company> optCompany = companyRepo.findById("1cf59833-4476-4357-8c10-3c5e190051e4");
            // checking if the details of the company are present

            if (optCompany.isPresent()) {

                // company is found from the database
                logger.info("Information of the company is found {}",optCompany.get());

                return optCompany.get();

            }else{

                // the details of the company are not found
                logger.error("The company details are not found {} ", optCompany);
                throw new NotFoundException("The company is not found");
            }
        } catch (Exception ex) {

            //something went wrong with the server message
            logger.error("Something went wrong with the server method get company ", ex);
            throw new ServerException("thasghdhjas");

        }
    }

    public void addCompany(Company company ) throws SavingException,ServerException{

        try{
            Company savedCompany = companyRepo.save(company);

            // Checking if the company details are stored to the database
            if(savedCompany==null){
                logger.error("Something went wrong while saving the company details{} ",savedCompany);
                throw new SavingException("Something went wrong while adding company to the database ");

            }
            // if not everything went well
            logger.info("Successfully saved the company details{} ",savedCompany);

        }catch(Exception ex  ){
            logger.error(ex.getMessage(),ex);
            throw new ServerException();

        }
    }
}
