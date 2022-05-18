package com.service.application_service.SchedulerService;

import com.service.application_service.model.Notification;
import com.service.application_service.model.User;
import com.service.application_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class Scheduler {

    @Autowired
    NotificationScheduler notificationScheduler;
    @Autowired
    UserRepository userRepository;


    @Scheduled(cron = "00 03 10 * * *")
    public void sayHello() throws IOException {

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy MM dd");
        System.out.println("Notification system working.. :)");
        List<User> users = userRepository.findAll();
        String date = simpleDateFormat.format(new Date());

        users.stream().forEach( (user) -> {
            if (!user.getNotificationToken().isEmpty()){
                //!! do poprawki !!
                user.getAppointments().stream().forEach((appointment) -> {
                    if (date.compareTo(simpleDateFormat.format(appointment.getDate())) == 0) {
                        System.out.println("date is equals");
                        try {
                            List<Notification> userNotifications = user.getNotifications();
                            Notification notification = Notification.builder()
                                            .title(appointment.getAppointmentTitle())
                                                    .description(appointment.getAppoinmentDescription())
                                                            .build();
                            userNotifications.add(notification);
                            userRepository.save(user);
                            notificationScheduler.send(appointment, user.getNotificationToken());
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                });
            }
        });
    }

}
