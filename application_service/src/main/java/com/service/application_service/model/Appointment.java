package com.service.application_service.model;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class Appointment {
    String appointmentTitle;
    String appoinmentDescription;
    Date date;
}
