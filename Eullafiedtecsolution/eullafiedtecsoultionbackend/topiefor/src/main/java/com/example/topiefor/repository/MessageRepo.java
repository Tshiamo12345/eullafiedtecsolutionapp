package com.example.topiefor.repository;

import com.example.topiefor.model.Conversation;
import com.example.topiefor.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository<Message,String> {

    List<Message> findByConversation(Conversation conversation);
}
