package com.example.topiefor.controller;

import com.example.topiefor.model.Conversation;
import com.example.topiefor.service.ConversationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/eullafied/conversation")
public class ConversationController {

    private ConversationService conversationService;

    @GetMapping
    public ResponseEntity<List<Conversation>> getConversationsForCurrentUser(){

    return null;
    }

}
