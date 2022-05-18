package com.service.application_service.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegistrationUserDto {
    String username;
    String firstName;
    String lastName;
    String password;
}
