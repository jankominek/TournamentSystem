package com.service.application_service.controller;

import com.service.application_service.DTO.UserDto;
import com.service.application_service.model.User;
import com.service.application_service.service.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("service/api")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/test")
    public String test(){
        return "test completed!";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String getAdminRole(){
        return "This is admin page";
    }

    @GetMapping("/permissionPage")
    public String getPermissionPage(){
        return "permission page";
    }

    @GetMapping("/user/logged")
    public UserDto getUser(Authentication authentication){
        if ( authentication != null){
            return userService.getUser(authentication.getName());
        }
        return null;
    }


    @GetMapping("/user/users")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<User> getUsers(){
        return userService.getAllUsers();
    }

}

@Data
class UserExpoToken{
    String username;
    String token;
}
