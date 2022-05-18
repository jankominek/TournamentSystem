package com.service.application_service.DTO;

import lombok.Builder;
import lombok.Data;

import java.sql.Date;

@Data
@Builder
public class AppointmentDto {
    String username;
    String appointmentTitle;
    String appoinmentDescription;
    String date;
}
