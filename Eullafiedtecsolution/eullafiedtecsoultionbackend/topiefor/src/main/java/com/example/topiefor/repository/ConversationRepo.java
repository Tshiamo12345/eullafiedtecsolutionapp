package com.example.topiefor.repository;

import com.example.topiefor.model.Conversation;
import com.example.topiefor.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConversationRepo extends JpaRepository<Conversation,String > {

    @Query("SELECT c FROM Conversation c WHERE c.user1 = :user OR c.user2 = :user")
    List<Conversation> findConversationsForUser(@Param("user") User user);
}
