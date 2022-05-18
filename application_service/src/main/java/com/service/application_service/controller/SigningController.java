package com.service.application_service.controller;

import com.service.application_service.service.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping()
@RestController
@CrossOrigin("localhost:19000")
public class SigningController {

    @Autowired
    UserService userService;

    @PostMapping("/register")
    public Boolean registerUser(@RequestBody UserDDTOO userDto){
        System.out.println("username " + userDto.getUsername());
        return userService.createUser(userDto.getUsername(), userDto.getPassword());
    }

}

@Data
class UserDDTOO{
    String username;
    String password;
}
