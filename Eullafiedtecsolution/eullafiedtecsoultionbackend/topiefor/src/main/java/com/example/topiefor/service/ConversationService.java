package com.example.topiefor.service;

import com.example.topiefor.exception.NotFoundException;
import com.example.topiefor.model.Conversation;
import com.example.topiefor.model.DTO.ConversationDTO;
import com.example.topiefor.model.Message;
import com.example.topiefor.model.User;
import com.example.topiefor.repository.ConversationRepo;
import com.example.topiefor.repository.MessageRepo;
import com.example.topiefor.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ConversationService {


    private final ConversationRepo conversationRepo;

    private final UserRepo userRepo;


    @Autowired
    private MessageRepo messageRepo;

    public ConversationService(ConversationRepo conversationRepo,UserRepo userRepo){
        this.conversationRepo = conversationRepo;
        this.userRepo = userRepo;
    }
    public List<ConversationDTO> getConversationForUser(String userId) throws NotFoundException {
        Optional<User> optUser = userRepo.findById(userId);
        if (optUser.isEmpty()) {
            throw new NotFoundException();
        }
        User currentUser = optUser.get();

        List<Conversation> conversations = conversationRepo.findConversationsForUserOrderByLatestMessage(currentUser);

        return conversations.stream()
                .map(conversation -> {
                    User otherUser = conversation.getUser1().getUser_id().equals(userId) ? conversation.getUser2() : conversation.getUser1();
                    return new ConversationDTO(
                            conversation.getId(),
                            otherUser.getUsername(),
                            otherUser.getProfilePicture(),
                            otherUser.getStatus()
                    );
                })
                .collect(Collectors.toList());
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
