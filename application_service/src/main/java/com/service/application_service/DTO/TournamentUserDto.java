package com.service.application_service.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TournamentUserDto {
    private String username;
    private String firstName;
    private String lastName;
    private Integer rank;
}
