package com.example.topiefor.controller;

import com.example.topiefor.exception.NotAuthorizedException;
import com.example.topiefor.exception.NotFoundException;
import com.example.topiefor.exception.ServerException;
import com.example.topiefor.model.DTO.UserLoginDTO;
import com.example.topiefor.model.DTO.UserTokenDto;
import com.example.topiefor.model.RecentActivity;
import com.example.topiefor.model.User;
import com.example.topiefor.service.UserService;
import org.slf4j.ILoggerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import java.io.ByteArrayInputStream;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/eullafied/user")
@CrossOrigin()
public class UserController {

    private final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<UserTokenDto> LoginUser(@RequestBody UserLoginDTO userLoginDTO){

        try {
            UserTokenDto userTokenDto = userService.userLogin(userLoginDTO);
            return new ResponseEntity<>(userTokenDto,HttpStatus.OK);

        } catch (NotAuthorizedException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }catch(Exception ex){
            try {
                userService.incrementFailedAttempt(userLoginDTO.getUsername());
            } catch (NotAuthorizedException e) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            } catch (NotFoundException e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @PostMapping("/upload-profile")
    public ResponseEntity<User> uploadProfilePic(
            @RequestParam("profilePic") MultipartFile profilePic,
            @RequestParam("userId") String userId) {
        try {
            logger.info("getting everything ready");
            userService.uploadProfile(profilePic, userId);
            logger.info("about to do the right thing ");
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception exception) {
            logger.error("Something went wrong ");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/profile-Picture")
    public ResponseEntity<byte[]> getProfilePicture(@RequestParam String userId){
        try {
            byte[] profilePicture = userService.loadProfilePicture(userId);
            if (profilePicture == null || profilePicture.length == 0) {
                return ResponseEntity.notFound().build();
            }

            String contentType = detectImageContentType(profilePicture).orElse("application/octet-stream");

            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.CONTENT_TYPE, contentType);
            headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"profile-" + userId + "\"");
            // optionally set cache-control
            // headers.setCacheControl(CacheControl.maxAge(3600, TimeUnit.SECONDS).mustRevalidate().getHeaderValue());

            return ResponseEntity.ok().headers(headers).body(profilePicture);
        } catch(NotFoundException ex){
            return ResponseEntity.notFound().build();
        } catch(ServerException ex){
            return ResponseEntity.status(500).build();
        }
    }

    /** helper: detect common image content types using ImageIO */
    private Optional<String> detectImageContentType(byte[] data) {
        try (ByteArrayInputStream bais = new ByteArrayInputStream(data);
             ImageInputStream iis = ImageIO.createImageInputStream(bais)) {

            if (iis == null) return Optional.empty();

            Iterator<ImageReader> readers = ImageIO.getImageReaders(iis);
            if (!readers.hasNext()) return Optional.empty();

            ImageReader reader = readers.next();
            String format = reader.getFormatName();
            if (format == null) return Optional.empty();
            format = format.toLowerCase();

            switch (format) {
                case "jpeg":
                case "jpg":
                    return Optional.of("image/jpeg");
                case "png":
                    return Optional.of("image/png");
                case "gif":
                    return Optional.of("image/gif");
                case "bmp":
                    return Optional.of("image/bmp");
                case "webp":
                    return Optional.of("image/webp");
                default:
                    return Optional.empty();
            }
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    @GetMapping("/recentActivity")
    public ResponseEntity<List<RecentActivity>> getRecentAtivities(@RequestParam String userId){

        try{
            List<RecentActivity> recentActivities = userService.getRecentAcivities(userId);
            return new ResponseEntity<>(recentActivities,HttpStatus.OK);
        }catch(NotFoundException ex){
            logger.error("User not found");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch(Exception ex){
            logger.error("Something went wrong with the  server ");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    }

