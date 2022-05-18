package com.service.application_service.service;

import com.service.application_service.DTO.UserDto;
import com.service.application_service.model.User;
import com.service.application_service.repository.UserRepository;
import com.service.application_service.security.PasswordConfig;
import com.service.application_service.security.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordConfig passwordConfig;


    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public Boolean createUser(String username, String password){

        if(userRepository.findUserByUsername(username).isPresent()){
            return false;
        }

        User user = User.builder()
                .username(username)
                .password(passwordConfig.passwordEncoder().encode(password))
                .grantedAuthorities(UserRole.USER.getGrantedAuthorities())
                .isAccountNonExpired(true)
                .isAccountNonLocked(true)
                .isCredentialsNonExpired(true)
                .isEnabled(true)
                .build();

        System.out.println(username + "   " + password);
        userRepository.save(user);

        return true;
    }


    public UserDto getUser(String username){
        User user = userRepository.findUserByUsername(username).get();
        return UserDto.builder()
                .username(user.getUsername())
                .accesToken("")
                .build();
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDetails user = userRepository.findUserByUsername(username).orElseThrow( () ->
                new UsernameNotFoundException(String.format("Username %s not found", username)));
        System.out.println(user.getUsername());
        return user;
    }

}
