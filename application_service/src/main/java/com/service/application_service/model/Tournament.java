package com.service.application_service.model;

import com.service.application_service.DTO.TournamentUserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.jni.Local;
import org.checkerframework.common.aliasing.qual.Unique;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Tournament {

    @Id
    private String id;
    @Indexed(unique = true)
    private String name;
    private String discipline;
    private String organizer;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime deadlineStart;
    private LocalDateTime deadlineEnd;
    private Boolean isReady;
    private Boolean status;
    private Integer maxParticipants;
    private Integer playerNumber;
    private Integer minRank;
    private List<TournamentUserDto> users;
    private List<UserTournament> userTournaments;
    private TournamentCourse tournamentCourse;


}
