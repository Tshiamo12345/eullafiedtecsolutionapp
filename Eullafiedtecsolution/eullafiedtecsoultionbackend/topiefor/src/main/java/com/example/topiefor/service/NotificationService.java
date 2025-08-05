package com.example.topiefor.service;

import com.example.topiefor.repository.NotificationRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private final Logger logger = LoggerFactory.getLogger(NotificationService.class);

    private NotificationRepo notificationRepo;

    public NotificationService(){}


}
