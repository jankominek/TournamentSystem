package com.service.application_service.controller;

import com.service.application_service.DTO.AppointmentDto;
import com.service.application_service.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("service/api/appoinment")
public class AppointmentController {

    @Autowired
    AppointmentService appointmentService;

    @PostMapping("/create")
    public void createUserAppointment(@RequestBody AppointmentDto appointment){
        try {
            appointmentService.createUserAppointment(appointment);

        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    @GetMapping("/test")
    public String test(){
        return "ASDASD";
    }
}
