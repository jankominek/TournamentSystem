package com.service.application_service.repository;

import com.service.application_service.model.Notification;
import com.service.application_service.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends MongoRepository<User, String> {

}
