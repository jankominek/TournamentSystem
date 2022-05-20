package com.service.application_service.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.service.application_service.DTO.JoinTournament;
import com.service.application_service.DTO.TournamentDto;
import com.service.application_service.model.Tournament;
import com.service.application_service.model.User;
import com.service.application_service.repository.TournamentRepository;
import com.service.application_service.repository.UserRepository;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.ObjectView;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class TournamentService {

    @Autowired
    TournamentRepository tournamentRepository;
    @Autowired
    UserRepository userRepository;

    public List<TournamentDto> getAll(){
        List<Tournament> tournament = tournamentRepository.findAll();

        List<TournamentDto> tournamentDtos = tournament.stream().map( (element) -> {
            return TournamentDto.builder()
                    .id(element.getId())
                    .name(element.getName())
                    .discipline(element.getDiscipline())
                    .organizer(element.getOrganizer())
                    .startDate(element.getStartDate().toString())
                    .endDate(element.getEndDate().toString())
                    .maxParticipants(element.getMaxParticipants())
                    .playerNumber(element.getPlayerNumber())
                    .minRank(element.getMinRank())
                    .build();
        }).collect(Collectors.toList());
        return tournamentDtos;
    }

    public Tournament getTournamentById(String id) {
        return tournamentRepository.findTournamentById(id).orElseThrow(
                () -> new NoSuchElementException("Tournament does not exists")
        );
    }

    public void createTournament(TournamentDto tournamentDto){

        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        User user = userRepository.findUserByUsername(tournamentDto.getOrganizer()).get();

        Tournament tournamentModel = Tournament.builder()
                .name(tournamentDto.getName())
                .discipline(tournamentDto.getDiscipline())
                .organizer(tournamentDto.getOrganizer())
                .startDate(LocalDateTime.parse(tournamentDto.getStartDate(), format))
                .endDate(LocalDateTime.parse(tournamentDto.getEndDate(), format))
                .maxParticipants(tournamentDto.getMaxParticipants())
                .playerNumber(tournamentDto.getPlayerNumber())
                .minRank(tournamentDto.getMinRank())
                .users(Collections.emptyList())
                .build();

        Tournament savedTournament = tournamentRepository.save(tournamentModel);
        List<Tournament> userTournaments = user.getTournaments();
        userTournaments.add(savedTournament);
        user.setTournaments(userTournaments);

        userRepository.save(user);
    }

    public Boolean joinTournament(JoinTournament joinTournament){
        Tournament tournament = tournamentRepository.findTournamentById(joinTournament.getTournamentId())
                .orElseThrow( () -> new NoSuchElementException("wrong tournament id"));

        User user = userRepository.findUserByUsername(joinTournament.getUsername())
                .orElseThrow( () -> new NoSuchElementException("user does not exists"));

        List<User> tournamentUsers = tournament.getUsers();
        tournamentUsers.add(user);
        tournament.setUsers(tournamentUsers);
        tournamentRepository.save(tournament);

        return true;
    }

}
