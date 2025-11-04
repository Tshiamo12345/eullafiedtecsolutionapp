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

    @Query(value = "SELECT c.* FROM conversation c " +
            "JOIN message m ON m.conversation_id = c.id " +
            "WHERE c.user1_id = :userId OR c.user2_id = :userId " +
            "GROUP BY c.id " +
            "ORDER BY MAX(m.sent_time) DESC",
            nativeQuery = true)
    List<Conversation> findConversationsForUserOrderByLatestMessage(@Param("user") User user);


}
