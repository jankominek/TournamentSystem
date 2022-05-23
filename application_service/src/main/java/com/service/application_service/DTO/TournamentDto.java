package com.service.application_service.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TournamentDto {

    private String id;
    private String name;
    private String discipline;
    private String organizer;
    private String startDate;
    private String endDate;
    private Integer maxParticipants;
    private Integer playerNumber;
    private Integer minRank;

}
