package com.service.application_service.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TournamentRound {
    private Integer round;
    private List<UserTournament> userTournaments;
    private Boolean isRoundEnd;
}
