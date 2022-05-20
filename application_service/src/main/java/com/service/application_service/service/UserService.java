package com.service.application_service.service;

import com.service.application_service.DTO.RegistrationUserDto;
import com.service.application_service.DTO.UserDto;
import com.service.application_service.model.User;
import com.service.application_service.repository.UserRepository;
import com.service.application_service.security.PasswordConfig;
import com.service.application_service.security.UserRole;
import com.service.application_service.utils.ConfirmationToken;
import com.service.application_service.utils.UserConfirmationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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

    public Boolean createUser(RegistrationUserDto userDto){

        if(userRepository.findUserByUsername(userDto.getUsername()).isPresent()){
            return false;
        }

        System.out.println(userDto.getUsername() + "   " + userDto.getPassword());


        String uuidToken = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = ConfirmationToken.builder()
                        .token(uuidToken)
                                .createdAt(LocalDateTime.now())
                                        .expiredAt(LocalDateTime.now().plusMinutes(15))
                                                .build();

        User user = User.builder()
                .username(userDto.getUsername())
                .firstName(userDto.getFirstName())
                .lastName(userDto.getLastName())
                .password(passwordConfig.passwordEncoder().encode(userDto.getPassword()))
                .tournaments(Collections.EMPTY_LIST)
                .rank(0)
                .userConfirmationToken(confirmationToken)
                .grantedAuthorities(UserRole.USER.getGrantedAuthorities())
                .isAccountNonExpired(true)
                .isAccountNonLocked(false)
                .isCredentialsNonExpired(true)
                .isEnabled(false)
                .build();

        userRepository.save(user);

        return true;
    }


    public UserDto getUser(String username){
        User user = userRepository.findUserByUsername(username).get();
        List<String> userAuthorities = user.getGrantedAuthorities().stream()
                .map( grantedAuthority -> grantedAuthority.toString())
                .collect(Collectors.toList());

        return UserDto.builder()
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .rank(user.getRank())
                .tournaments(user.getTournaments())
                .authorities(userAuthorities)
                .build();
    }

    public Boolean confirm(UserConfirmationToken userConfirmationToken){
        User user = userRepository.findUserByUsername(userConfirmationToken.getUsername()).orElseThrow(
                () -> new UsernameNotFoundException(String.format("Username %s not found", userConfirmationToken.getUsername()))
        );

        ConfirmationToken userConfirmationTokenObject = user.getUserConfirmationToken();
        LocalDateTime currentTime = LocalDateTime.now();

        if(currentTime.isBefore(userConfirmationTokenObject.getExpiredAt())){
            user.setEnabled(true);
            user.setAccountNonLocked(true);
            userConfirmationTokenObject.setConfirmedAt(currentTime);
            user.setUserConfirmationToken(userConfirmationTokenObject);
            userRepository.save(user);
        }else{
            String uuidToken = UUID.randomUUID().toString();
            ConfirmationToken confirmationToken = ConfirmationToken.builder()
                    .token(uuidToken)
                    .createdAt(LocalDateTime.now())
                    .expiredAt(LocalDateTime.now().plusMinutes(15))
                    .build();
            user.setUserConfirmationToken(confirmationToken);
            return false;
        }

        return true;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDetails user = userRepository.findUserByUsername(username).orElseThrow( () ->
                new UsernameNotFoundException(String.format("Username %s not found", username)));
        System.out.println(user.getUsername());
        return user;
    }

}
