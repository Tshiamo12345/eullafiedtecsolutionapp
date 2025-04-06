package com.example.topiefor.service;


import com.example.topiefor.exception.AlreadyExistException;
import com.example.topiefor.exception.NotFoundException;
import com.example.topiefor.exception.SavingException;
import com.example.topiefor.exception.ServerException;
import com.example.topiefor.model.Company;
import com.example.topiefor.repository.CompanyRepo;
import jakarta.transaction.Transactional;
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


    @Transactional
    public Company getCompanyDetails() throws NotFoundException, ServerException {

        try {

            Optional<Company> optCompany = companyRepo.findByIdWithAddressesAndLocation("f52a600a-874e-445e-a1c2-b1a03310f035");
            // checking if the details of the company are present

            if (optCompany.isPresent()) {

                // company is found from the database
                logger.info("Information of the company is foun {}", optCompany.get());

                return optCompany.get();

            } else {

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

    @Transactional
    public void addCompany(Company company) throws SavingException, ServerException, AlreadyExistException {

        try {

            // getting company by name
            logger.info("Getting company by name from database: name {}",company.getName());
            Optional<Company> companyExistByName = companyRepo.findByName(company.getName());

            // getting company by slogan
            logger.info("getting company by slogan from database: slogan {}",company.getSlogan());
            Optional<Company> companyExistBySlogan = companyRepo.findBySlogan(company.getSlogan());

            if(companyExistByName.isPresent() ){
                logger.error("Company already exist by name: {}",company.getName());
                throw new AlreadyExistException("The name of the company already exist in the database");
            }if(companyExistBySlogan.isPresent()){
                logger.error("Company already exist by slogan: {}",company.getSlogan());
                throw new AlreadyExistException("Company already by slogan in the database");
            }
            // saving the company
            logger.info("Saving company to the database: company {}",company);
            Company savedCompany = companyRepo.save(company);
            logger.info("Successfully saved the company details{} ", savedCompany);

        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
            throw new ServerException();

        }
    }

    @Transactional
    public void deleteCompany(Company company) throws ServerException, NotFoundException{
        try {

            boolean exist = companyExist(company);

            if(!exist){

                logger.error("Company does not exist in the database {} ",company);
                throw new NotFoundException("Company does not exist in the database");

            }

            companyRepo.delete(company);
            logger.info("Deleting company from the database ");
        } catch (Exception ex) {
            logger.error(message,ex);
            throw new ServerException();

        }

    }

    @Transactional
    public Company updateCompanyDetails(Company company) throws ServerException,NotFoundException {
        try {
            Optional<Company> optionalCompany = companyRepo.findById(company.getCompanyId());

            // checking the company you want to update in the database
            if(optionalCompany.isPresent()){

                logger.info("Found the company you want to update");
                Company companyFromDatabase = optionalCompany.get();
                companyFromDatabase.setName(company.getName());
                companyFromDatabase.setEmail(company.getEmail());
                companyFromDatabase.setSlogan(company.getSlogan());
                companyFromDatabase.setDescription(company.getDescription());
                companyFromDatabase.setCulture(company.getCulture());
                companyFromDatabase.setTellPhone(company.getTellPhone());
                companyRepo.save(companyFromDatabase);
                logger.info("Company has been successfully updated");
                return companyFromDatabase;
            }
            logger.error("The company you are trying to submit does not exist, Company: {}",company.getName());
            throw new NotFoundException("Company that you are trying to update does not exist ");
        } catch (Exception ex) {

            logger.error(message,ex);
            throw new ServerException();

        }

    }

    // checking if the company already exist in the database
    private boolean companyExist(Company company) throws ServerException {

        try {
            logger.info("Checks the method exist: {}",company);
            return companyRepo.existsById(company.getCompanyId());
        } catch (Exception ex) {
            logger.error(message,ex);
            throw new ServerException();
        }
    }
}

