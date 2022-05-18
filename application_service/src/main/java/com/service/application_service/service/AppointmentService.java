package com.service.application_service.service;

import com.service.application_service.DTO.AppointmentDto;
import com.service.application_service.model.Appointment;
import com.service.application_service.model.User;
import com.service.application_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    UserRepository userRepository;

    public void createUserAppointment(AppointmentDto appointment) throws ParseException {

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy MM dd");
        simpleDateFormat.parse(appointment.getDate());
        Date date = simpleDateFormat.parse(appointment.getDate());
        System.out.println(date);

        System.out.println(date);

        Appointment mongoAppointment = Appointment.builder()
                .appointmentTitle(appointment.getAppointmentTitle())
                .appoinmentDescription(appointment.getAppoinmentDescription())
                .date(date)
                .build();

        User user = userRepository.findUserByUsername(appointment.getUsername()).get();

        List<Appointment> userAppoinments = user.getAppointments();
        userAppoinments.add(mongoAppointment);

        user.setAppointments(userAppoinments);

        userRepository.save(user);

    }
}
