package com.service.application_service.controller;

import com.service.application_service.DTO.RegistrationUserDto;
import com.service.application_service.service.UserService;
import com.service.application_service.utils.ConfirmationToken;
import com.service.application_service.utils.ResetPassword;
import com.service.application_service.utils.UserConfirmationToken;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;

@RequestMapping()
@RestController
@CrossOrigin("localhost:3000")
public class SigningController {

    @Autowired
    UserService userService;

    @PostMapping("/register")
    public Boolean registerUser(@RequestBody RegistrationUserDto userDto){
        System.out.println("username " + userDto.getUsername());
        return userService.createUser(userDto);
    }

    @PostMapping("/register/confirm")
    public Boolean confirm(@RequestBody UserConfirmationToken userConfirmationToken){
        return userService.confirm(userConfirmationToken);
    }


    @PostMapping("/forgot/{email}")
    public void forgotPassword(@PathVariable String email){
        userService.forgotPassword(email);
    }

    @PostMapping("/reset/{email}/{token}/{password}")
    @PermitAll
    public void resetPassword(@PathVariable String email, @PathVariable String token, @PathVariable String password){
        userService.resetPassword(email, token, password);
    }



}

@Data
class UserDDTOO{
    String username;
    String firstName;
    String lastName;
    String password;
}
