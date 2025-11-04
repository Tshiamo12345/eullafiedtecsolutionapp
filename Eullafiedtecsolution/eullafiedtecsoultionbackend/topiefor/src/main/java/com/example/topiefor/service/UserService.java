package com.example.topiefor.service;


import com.example.topiefor.exception.NotAuthorizedException;
import com.example.topiefor.exception.NotFoundException;
import com.example.topiefor.exception.ServerException;
import com.example.topiefor.model.DTO.UserLoginDTO;
import com.example.topiefor.model.DTO.UserTokenDto;
import com.example.topiefor.model.Document;
import com.example.topiefor.model.RecentActivity;
import com.example.topiefor.model.User;
import com.example.topiefor.model.UserPrincipal;
import com.example.topiefor.repository.DocumentRepo;
import com.example.topiefor.repository.RecentActivityRepo;
import com.example.topiefor.repository.UserRepo;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private AuthenticationManager authenticationManager;
    private final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepo userRepo;
    private final DocumentRepo documentRepo;
    private final RecentActivityRepo recentActivityRepo;
    private JWTService jwtService;

    public UserService(@Lazy AuthenticationManager authenticationManager,RecentActivityRepo recentActivityRepo, UserRepo userRepo, JWTService jwtService,DocumentRepo documentRepo) {
        this.authenticationManager = authenticationManager;
        this.userRepo = userRepo;
        this.jwtService = jwtService;
        this.documentRepo = documentRepo;
        this.recentActivityRepo = recentActivityRepo;
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

    @Transactional
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

    @Transactional
    public void uploadProfile (MultipartFile profilePicture , String userId) throws Exception {

        try{
            Optional<User> user = userRepo.findById(userId);
            if(user.isEmpty()){
                logger.error("Could not find a user");
                throw  new Exception("Could not find a user");
            }
                byte[] profilePicBytes = profilePicture.getBytes();
                if(profilePicture.isEmpty()){
                    logger.error("I could not find a picture");
                    throw new Exception("could not find a picture");
                }
                logger.info("I am saving a user ");
                user.get().setProfilePicture(profilePicBytes);
                userRepo.save(user.get());
                // saving the activity
                String documentName = "ProfilePic";
                RecentActivity recentActivity = new RecentActivity(documentName,LocalDateTime.now(),userId);
                recentActivityRepo.save(recentActivity);


        }catch(Exception ex ){
            throw new Exception();
        }

    }

    @Transactional
    public byte[] loadProfilePicture(String user_id)throws NotFoundException, ServerException{

        try {
            // fetching user
            Optional<User> optUser = userRepo.findById(user_id);
            logger.info("Fetching a user, User{} ", optUser);

            if (optUser.isPresent()) {

                return optUser.get().getProfilePicture();
            }
            logger.error("user not found ");
            throw new NotFoundException();
        }catch(Exception ex){
            logger.error("Something went wrong with the server ",ex);
            throw new ServerException();
        }
    }

    @Transactional
    public List<RecentActivity> getRecentAcivities(String userId)throws Exception,NotFoundException{

        try{
            Optional<User> user = userRepo.findById(userId);
            if(user.isEmpty()){
                throw new NotFoundException();
            }

            List<RecentActivity> recentActivities = recentActivityRepo.findAllByUserIdOrderByRecentDateDesc(userId);


            return recentActivities;

        }catch(Exception ex){
            throw new Exception();
        }
    }
}
