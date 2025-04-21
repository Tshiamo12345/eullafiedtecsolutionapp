package com.example.topiefor.service;


import com.example.topiefor.exception.NotFoundException;
import com.example.topiefor.exception.ServerException;
import com.example.topiefor.model.DTO.UserLoginDTO;
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

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private AuthenticationManager authenticationManager;
    private final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepo userRepo;

    private final JWTService jwtService;

    public UserService(@Lazy AuthenticationManager authenticationManager, UserRepo userRepo,JWTService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }




    @Transactional
    public String userLogin(UserLoginDTO userLoginDTO)  {
    User user = new User();
    user.setUsername(userLoginDTO.getUsername());
    user.setPassword(user.getPassword());
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(),userLoginDTO.getPassword()));
        if(authentication.isAuthenticated())
            return jwtService.generateToken(user.getUsername());
        return "false";

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepo.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User Not found");
        }


        return new UserPrincipal(user);
    }
}
