package com.example.topiefor.repository;

import com.example.topiefor.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,String> {


    Optional<User> findByUsernameAndPassword(String username , String password);
    Optional<User> findByEmailAndPassword(String email , String password);
    User findByUsername(String username);

}
