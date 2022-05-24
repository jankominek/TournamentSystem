package com.service.application_service.utils;

import com.service.application_service.model.UserTournament;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdatedUserTournament {
    private String name;
    private Integer round;
    private UserTournament userTournament;
    private String userTypeResult;
}
