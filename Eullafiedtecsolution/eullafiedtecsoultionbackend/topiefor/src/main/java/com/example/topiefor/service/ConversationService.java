package com.example.topiefor.service;

import com.example.topiefor.model.Conversation;
import com.example.topiefor.model.DTO.ConversationDTO;
import com.example.topiefor.model.Message;
import com.example.topiefor.model.User;
import com.example.topiefor.repository.ConversationRepo;
import com.example.topiefor.repository.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConversationService {

    @Autowired
    private ConversationRepo conversationRepo;

    @Autowired
    private MessageRepo messageRepo;

    public List<ConversationDTO> getConversationForUser(User user) {

        List<Conversation> conversations = conversationRepo.findConversationsForUser(user);

        return conversations.stream().map(conversation -> new ConversationDTO(conversation.getId(), conversation.getUser1().getUsername(), conversation.getUser1().getProfilePicture(),
                conversation.getUser1().getStatus())).collect(Collectors.toList());
    }

    public Conversation getConversation(String conversationID){

        return conversationRepo.findById(conversationID).orElseThrow();
    }

    public List<Message> getConversationMessages(Conversation conversation){
        return messageRepo.findByConversation(conversation);
    }

    public Message sendMessage(Conversation conversation, User sender ,String message){
        Message message1 = new Message();
        message1.setConversation(conversation);
        message1.setSender(sender);
        message1.setMessage(message);
        return messageRepo.save(message1);
    }
}
