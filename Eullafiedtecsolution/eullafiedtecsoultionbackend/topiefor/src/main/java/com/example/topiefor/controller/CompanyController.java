package com.example.topiefor.controller;

import com.example.topiefor.exception.NotFoundException;
import com.example.topiefor.exception.SavingException;
import com.example.topiefor.exception.ServerException;
import com.example.topiefor.model.Company;
import com.example.topiefor.service.CompanyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/eullafied/company")
@CrossOrigin()
// this Is a controller used to create the system
public class CompanyController {

    @Autowired
    private final CompanyService companyService;
    private final Logger logger = LoggerFactory.getLogger(CompanyController.class);

    public CompanyController(CompanyService companyService) {

        this.companyService = companyService;
    }

    @GetMapping
    public ResponseEntity<Company> getCompany() {

        try {

            Company company = companyService.getCompanyDetails();

            logger.info("The company details are found {}", company);
            //Successfully returned the company details
            return new ResponseEntity<>(company, HttpStatus.OK);

        } catch (NotFoundException ne) {
            // this is caught when the content of the company is not found
            logger.error("The company details are not found ", ne);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        } catch (ServerException e) {
            // this is caught due to internal sever issues
            logger.error("Something went wrong with the server ", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Company> addCompany(@RequestBody Company company) {
        try {

            companyService.addCompany(company);
            logger.info("The company is saved to the database {} ", company.toString());
            //company is saved to the database
            return new ResponseEntity<>(company, HttpStatus.CREATED);

        } catch (SavingException se) {
            // this is caught due to the saving problems
            logger.error("System Failed to save the company details ", se);
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (ServerException e) {
            //this is caught due to internal server error has nothing to do with the code
            logger.error("Something went wrong with server");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping
    public ResponseEntity<Company> deleteCompany(@RequestBody Company company){

        try {
            logger.info("Preparing deletion to the database ");
            companyService.deleteCompany(company);
            logger.info("Successfully deleted the company details from the database: {} ",company);
            return new ResponseEntity<>(company,HttpStatus.OK);
        }catch(NotFoundException notFoundException){
            logger.error("The Company that you want to delete is not in the database ");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        }catch(Exception ex){
            logger.error("Something went wrong with server ",ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
