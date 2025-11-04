package com.example.topiefor.controller;

import com.example.topiefor.exception.NotFoundException;
import com.example.topiefor.model.DTO.UploadFileDTO;
import com.example.topiefor.model.Document;
import com.example.topiefor.service.DocumentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/eullafied/document")
public class DocumentController {

    private static final String info = "Preparing the request from the client";
    private static final String endInfo = "request fulfilled";
    private final DocumentService documentService;
    private final Logger logger = LoggerFactory.getLogger(DocumentService.class);

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }
    @GetMapping("/admin")
    public ResponseEntity<List<Document>> getAllAdminsDocuments() {
        try {
            logger.info(info);
            List<Document> documents = documentService.getAllAdminsDocuments();
            logger.info("Request fulfilled");
            return new ResponseEntity<>(documents, HttpStatus.FOUND);
        } catch (Exception ex) {
            logger.error("Something went wrong with the server ", ex);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/user")
    public ResponseEntity<List<Document>> getUserDocuments(@RequestParam String userId) {
        try {
            logger.info(info);
            List<Document> userDocuments = documentService.getUserDocuments(userId);
            logger.info(endInfo);
            return new ResponseEntity<>(userDocuments, HttpStatus.OK);
        } catch (NotFoundException ex) {
            logger.error("Could not the Documents. No user with Id{}", userId);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Something went wrong with the server ");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping
    public ResponseEntity<Document> uploadDocument(
            @RequestParam("fileName") String fileName,
            @RequestParam("userId") String userId,
            @RequestParam("file") MultipartFile file) {

        try {

            logger.info(info);
            UploadFileDTO uploadFileDTO = new UploadFileDTO(fileName, userId, file);

            documentService.userUploadDocument(uploadFileDTO);
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (NotFoundException ex) {
            logger.error("user not found with an Id{} ", userId);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Something went wrong with the Server");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
    @GetMapping("/download")
    public ResponseEntity<Resource> downloadFile(@RequestParam String documentId){
        try{

            logger.info(info);
            Document document = documentService.downloadFile(documentId);
            ByteArrayResource resource = new ByteArrayResource(document.getFile());

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + document.getFileName() + "\"")
                    .contentType(MediaType.APPLICATION_PDF) // or use MediaType.APPLICATION_OCTET_STREAM for general files
                    .contentLength(document.getFile().length)
                    .body(resource);
        }catch(NotFoundException ex){
            logger.error("The File is not found ");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }catch(Exception ex){
            logger.error(endInfo);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }
}
