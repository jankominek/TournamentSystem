package com.service.application_service.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document
public class UserTournament {

    @Id
    private String id;
    private String firstUser;
    private String secondUser;
    private String firstUserResult;
    private String secondUserResult;
    private Boolean isResultCorrect;

}
