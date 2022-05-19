package com.service.application_service.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.jni.Local;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Tournament {

    private String name;
    private String discipline;
    private String organizer;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Integer maxParticipants;
    private Integer playerNumber;
    private Integer minRank;
    private List<User> users;


}
