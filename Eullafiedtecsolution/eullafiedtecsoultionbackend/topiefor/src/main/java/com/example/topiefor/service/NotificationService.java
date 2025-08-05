package com.example.topiefor.service;

import com.example.topiefor.model.Notification;
import com.example.topiefor.repository.NotificationRepo;
import org.aspectj.weaver.ast.Not;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {

    private final Logger logger = LoggerFactory.getLogger(NotificationService.class);

    private final NotificationRepo notificationRepo;

    public NotificationService(NotificationRepo notificationRepo){

        this.notificationRepo = notificationRepo;

    }

    public List<Notification> getUserNotifications(String id){

        try{
            List<Notification> getAllNotifications= notificationRepo.findAll();
            List<Notification> userNotifications = new ArrayList<>();
            for(Notification notification : getAllNotifications){


             }

        }catch(Exception exception){

        }
    return null;
    }





}
