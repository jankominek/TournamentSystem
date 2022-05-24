package com.service.application_service.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.service.application_service.DTO.JoinTournament;
import com.service.application_service.DTO.TournamentDto;
import com.service.application_service.DTO.TournamentUserDto;
import com.service.application_service.model.Tournament;
import com.service.application_service.model.TournamentCourse;
import com.service.application_service.model.User;
import com.service.application_service.model.UserTournament;
import com.service.application_service.repository.TournamentRepository;
import com.service.application_service.repository.UserRepository;
import com.service.application_service.utils.UpdatedUserTournament;
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

    public List<Tournament> getAllTournament(){
        return tournamentRepository.findAll();
    }

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

    public List<Tournament> getUserTournaments(String user){
        List<Tournament> tournaments = getAllTournament();
        List<Tournament> userTournaments = tournaments.stream().filter( (tournament) -> {
            List<TournamentUserDto> t = tournament.getUsers()
                    .stream().filter( (usr) -> usr.getUsername().equals(user)).collect(Collectors.toList());

            if(t.size() > 0){
                return true;
            }
            return false;

        }).collect(Collectors.toList());

        return userTournaments;
    }

    public Tournament getTournamentById(String id) {
        return tournamentRepository.findTournamentById(id).orElseThrow(
                () -> new NoSuchElementException("Tournament does not exists")
        );
    }

    public void createTournament(TournamentDto tournamentDto){

        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        User user = userRepository.findUserByUsername(tournamentDto.getOrganizer()).get();

        TournamentCourse tournamentCourse = new TournamentCourse();
        tournamentCourse.setTournamentRounds(Collections.emptyList());

        Tournament tournamentModel = Tournament.builder()
                .name(tournamentDto.getName())
                .discipline(tournamentDto.getDiscipline())
                .organizer(tournamentDto.getOrganizer())
                .startDate(LocalDateTime.parse(tournamentDto.getStartDate(), format))
                .endDate(LocalDateTime.parse(tournamentDto.getEndDate(), format))
                .isReady(false)
                .status(false)
                .maxParticipants(tournamentDto.getMaxParticipants())
                .playerNumber(tournamentDto.getPlayerNumber())
                .minRank(tournamentDto.getMinRank())
                .users(Collections.emptyList())
                .userTournaments(Collections.emptyList())
                .tournamentCourse(tournamentCourse)
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


        List<TournamentUserDto> tournamentUsers = tournament.getUsers();
        TournamentUserDto tournamentUserDto = TournamentUserDto.builder()
                        .firstName(user.getFirstName())
                                .lastName(user.getLastName())
                                        .username(user.getUsername())
                                                .rank(user.getRank())
                                                        .build();
        tournamentUsers.add(tournamentUserDto);
        tournament.setUsers(tournamentUsers);
        tournamentRepository.save(tournament);

        return true;
    }

    public Boolean saveTournamentResult(UpdatedUserTournament updatedUserTournament){
        Tournament dbTournament = tournamentRepository.findTournamentByName(updatedUserTournament.getName()).orElseThrow(() ->
                new NoSuchElementException("tournament does not exists"));n
//
//        UserTournament userTournament = dbTournament.getTournamentCourse().getTournamentRounds().stream().forEach( (usrTour) -> {
//            if(usrTour.getRound().equals(round)) {
//               usrTour.getUserTournaments().forEach( (userTournamentDb) -> {
//                   if(userTournamentDb.getId().equals(id)){
//                       if(userTournamentDb.getFirstUserResult().equals("") && userTournamentDb.getSecondUserResult().equals("")){
//                           tournamentRepository.save(tournament);
//                       }else{
//
//                       }
//                   }
//               });
//            }
//            return false;
//        });

        return true;
    };


}
