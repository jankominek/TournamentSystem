package com.service.application_service.controller;

import com.service.application_service.model.Notification;
import com.service.application_service.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/service/notification")
public class NotificationController {

    @Autowired
    NotificationService notificationService;

    @GetMapping("/user/{username}")
    public List<Notification> getUserNotification(@PathVariable String username){
        return notificationService.getUserNotifications(username);
    }
}
