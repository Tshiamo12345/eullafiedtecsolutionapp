package com.example.topiefor.service;


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
    public UserTokenDto userLogin(UserLoginDTO userLoginDTO) {
        User user = new User();
        String token = " ";
        UserTokenDto userTokenDto = new UserTokenDto();
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(userLoginDTO.getUsername(), userLoginDTO.getPassword()));

        if (authentication.isAuthenticated()){
            token = jwtService.generateToken(userLoginDTO.getUsername());
            user = userRepo.findByUsername(userLoginDTO.getUsername());
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
}
