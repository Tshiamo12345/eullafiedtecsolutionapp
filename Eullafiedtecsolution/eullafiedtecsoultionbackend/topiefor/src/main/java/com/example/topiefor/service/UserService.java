package com.example.topiefor.service;


import com.example.topiefor.exception.NotAuthorizedException;
import com.example.topiefor.exception.NotFoundException;
import com.example.topiefor.exception.ServerException;
import com.example.topiefor.model.DTO.UserLoginDTO;
import com.example.topiefor.model.DTO.UserTokenDto;
import com.example.topiefor.model.User;
import com.example.topiefor.model.UserPrincipal;
import com.example.topiefor.repository.UserRepo;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private AuthenticationManager authenticationManager;
    private final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepo userRepo;

    private JWTService jwtService;

    public UserService(@Lazy AuthenticationManager authenticationManager, UserRepo userRepo, JWTService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }


    @Transactional
    public UserTokenDto userLogin(UserLoginDTO userLoginDTO) throws NotAuthorizedException{
        User user = null;
        String token = " ";
        UserTokenDto userTokenDto = new UserTokenDto();
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(userLoginDTO.getUsername(), userLoginDTO.getPassword()));

        if (authentication.isAuthenticated()) {
            token = jwtService.generateToken(userLoginDTO.getUsername());
            user = userRepo.findByUsername(userLoginDTO.getUsername());
            if (user.getFailedAttemptCount() >= 3) {
                throw new NotAuthorizedException("AccountLocked");
            }
            user.setLastLogin(LocalDateTime.now());
            user.setFailedAttemptCount(0); // Optional: reset on success
            userRepo.save(user);
            userTokenDto.setUser(user);
            userTokenDto.setToken(token);
            return userTokenDto;

        }
        return null;


    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepo.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User Not found");
        }


        return new UserPrincipal(user);
    }
    public void incrementFailedAttempt(String username) throws NotAuthorizedException , NotFoundException{
        User user = null;
        user = userRepo.findByUsername(username);

        if (user != null) {

            int failedCount = user.getFailedAttemptCount();
            if(failedCount<=3) {
                int incrementedFailedCount = failedCount + 1;
                user.setFailedAttemptCount(incrementedFailedCount);
                userRepo.save(user);
                throw new NotFoundException();
            }
            }
        // Throw unauthorized if needed
        throw new NotAuthorizedException("Invalid credentials");
    }
}
