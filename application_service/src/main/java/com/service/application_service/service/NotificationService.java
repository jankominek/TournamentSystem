package com.service.application_service.service;

import com.service.application_service.model.Notification;
import com.service.application_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    UserRepository userRepository;

    public List<Notification> getUserNotifications(String username){
        List<Notification> notifications = userRepository.findUserByUsername(username)
                .get().getNotifications();
        return notifications;
    }
}
