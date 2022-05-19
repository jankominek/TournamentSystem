package com.service.application_service.DTO;

import com.service.application_service.model.Tournament;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class UserDto {

    String username;
    String firstName;
    String lastName;
    List<String> authorities;
    String token;
    List<Tournament> tournaments;
    Integer rank;

}
