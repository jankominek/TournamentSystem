package com.service.application_service.DTO;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserDto {

    String username;
    String accesToken;
    String expoToken;

}
