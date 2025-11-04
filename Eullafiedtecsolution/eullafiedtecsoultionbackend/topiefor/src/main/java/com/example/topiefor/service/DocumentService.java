package com.example.topiefor.service;

import com.example.topiefor.exception.NotFoundException;
import com.example.topiefor.exception.ServerException;
import com.example.topiefor.model.DTO.UploadFileDTO;
import com.example.topiefor.model.Document;
import com.example.topiefor.model.RecentActivity;
import com.example.topiefor.model.User;
import com.example.topiefor.repository.DocumentRepo;
import com.example.topiefor.repository.RecentActivityRepo;
import com.example.topiefor.repository.UserRepo;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DocumentService {

    @Autowired
    private final DocumentRepo documentRepo;
    private final UserRepo userRepo;
    private final Logger logger = LoggerFactory.getLogger(DocumentService.class);
    private final RecentActivityRepo recentActivityRepo;
    public DocumentService(DocumentRepo documentRepo, UserRepo userRepo, RecentActivityRepo recentActivityRepo) {
        this.documentRepo = documentRepo;
        this.userRepo = userRepo;
        this.recentActivityRepo = recentActivityRepo;
    }

    @Transactional
    public List<Document> getAllDocuments() throws NotFoundException {

        try {
            // getting files from the services
            logger.info("about to get All the documents from the system");
            return documentRepo.findAll();

        } catch (Exception ex) {
            throw new NotFoundException();
        }
    }

    public Document downloadDocument() {

        return null;
    }

    @Transactional
    public void userUploadDocument(UploadFileDTO uploadFileDTO) throws NotFoundException, Exception {

        try {
            //getting details of the file to be uploaded
            String filename = uploadFileDTO.getName();
            String userId = uploadFileDTO.getUserId();
            byte[] file;
            try {
                // checking file that has been uploaded
                file = uploadFileDTO.getFile().getBytes();
            } catch (IOException e) {
                logger.error("Could not get a file ");
                throw new RuntimeException(e);
            }
            logger.info("Getting a user");
            Optional<User> optUser = userRepo.findById(userId);
            if (optUser.isEmpty()) {
                logger.error("user not found with userId: {}", userId);
                throw new NotFoundException();
            }
            // instantiation of document
            Document document = new Document(filename,file,LocalDateTime.now(),optUser.get());
            // saving a document
            documentRepo.save(document);
            // uploading the recent activity
            String documentName = "Document";
            RecentActivity recentActivity = new RecentActivity(documentName,LocalDateTime.now(),userId);
            recentActivityRepo.save(recentActivity);
            logger.info("Document save: {}", document);
        } catch (Exception ex) {
            logger.error("Something went wrong with the server");
            throw new Exception();
        }
    }

    @Transactional
    public List<Document> getUserDocuments(String userId) throws Exception {


        try {
            //getting all documents from the database
            List<Document> allDocuments = documentRepo.findAllByOrderByLocalDateTimeDesc();
            // instantiation
            List<Document> userDocuments = new ArrayList<>();
            //iteration begins
            logger.info("tshiamo {}",allDocuments.get(0).getUser().getUser_id());
            logger.info("My User Id {} ",userId);
            logger.info("iteration begins ");
            for (Document document : allDocuments) {

                // checking if documents belongs to the user lala
                if (document.getUser().getUser_id().equalsIgnoreCase(userId)) {
                    logger.info("Information about the documents {} ",document.toString());
                    userDocuments.add(document);
                }
            }
            return userDocuments;
        } catch (Exception ex) {
            logger.error("Something went wrong with server ", ex);
            throw new Exception();
        }
    }

    public List<Document> getAllAdminsDocuments() throws Exception {

        try {
            // get all documents
            List<Document> allDocuments = documentRepo.findAllByOrderByLocalDateTimeDesc();
            // instantiation
            List<Document> adminDocuments = new ArrayList<>();

            //iteration
            logger.info("About to start iteration");
            for (Document document : allDocuments) {

                //check if belongs to the user
                if (document.getUser().getRole().equalsIgnoreCase("admin")) {

                    adminDocuments.add(document);
                }
            }
            logger.info("returning all admin documents");
            return adminDocuments;
        } catch (Exception ex) {
            logger.error("Something went wrong with server ", ex);
            throw new Exception();
        }
    }


    public Document downloadFile(String documentId )throws NotFoundException, ServerException{
        try{

            logger.info("getting the document ");
            Optional<Document> optDocument = documentRepo.findById(documentId);
            if(optDocument.isEmpty()){
                logger.error("Not found . Document with ID {} ",documentId);
                throw new NotFoundException();
            }
            logger.info("Returning the document ");
            return optDocument.get();
        }catch(Exception ex){
            logger.error("something with wrong with the server ");
            throw new ServerException();
        }

    }

}
