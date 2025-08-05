package com.example.topiefor.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Conversation {


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id ;

    @ManyToOne
    @JoinColumn(name = "user1_id")
    private User user1;

    @ManyToOne
    @JoinColumn(name = "user2_id")
    private User user2;

    @OneToMany(mappedBy = "conversation")
    private List<Message> messages;

    public Conversation() {
    }

    public Conversation(String id, User user1, User user2, List<Message> messages) {
        this.id = id;
        this.user1 = user1;
        this.user2 = user2;
        this.messages = messages;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getUser1() {
        return user1;
    }

    public void setUser1(User user1) {
        this.user1 = user1;
    }

    public User getUser2() {
        return user2;
    }

    public void setUser2(User user2) {
        this.user2 = user2;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }
}
