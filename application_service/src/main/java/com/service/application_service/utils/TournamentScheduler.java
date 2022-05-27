package com.service.application_service.utils;

import com.service.application_service.DTO.TournamentDto;
import com.service.application_service.DTO.TournamentUserDto;
import com.service.application_service.model.Tournament;
import com.service.application_service.model.TournamentCourse;
import com.service.application_service.model.TournamentRound;
import com.service.application_service.model.UserTournament;
import com.service.application_service.repository.TournamentRepository;
import com.service.application_service.service.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
@EnableScheduling
public class TournamentScheduler {

    @Autowired
    TournamentRepository tournamentRepository;
    @Autowired
    TournamentService tournamentService;

    @Scheduled(fixedDelay = 3000)
    public void updateTournamentData(){
        System.out.println("scheduler");
        LocalDateTime currentTime = LocalDateTime.now();
        System.out.println("curent time : " + currentTime);
        List<Tournament> tournaments = tournamentService.getAllTournament();
        tournaments.stream().forEach( (tournament) -> {
            System.out.println("tournament time : " + tournament.getStartDate());
            Boolean isParticipantsFull = tournament.getUsers().size() == tournament.getMaxParticipants();
            if(tournament.getStartDate().isBefore(currentTime) && !tournament.getIsReady() && isParticipantsFull){
                List<UserTournament> ut = organizeTournamentForUsers(tournament);
                TournamentCourse tournamentCourse = organizeLadder(ut);
                System.out.println(" -----------> shadeuler working");
                tournament.setUserTournaments(ut);
                tournament.setIsReady(true);
                tournament.setTournamentCourse(tournamentCourse);
                tournamentRepository.save(tournament);
            }
            if(tournament.getIsReady() && !tournament.getStatus()){
                tournament.getTournamentCourse().getTournamentRounds().stream().forEach( (tournamentRound) ->{
                    if(tournamentRound.getIsRoundEnd()){
                        if(tournamentRound.getRound().equals(tournament.getTournamentCourse().getTournamentRounds().size())){
                            String winner = tournamentRound.getUserTournaments().get(0).getFirstUserResult();
                            tournament.setStatus(true);
                            tournament.setTournamentWinner(winner);
                            tournamentRepository.save(tournament);
                        }
                        else{
                            TournamentRound nextTournamentRound = tournament.getTournamentCourse().getTournamentRounds().get(tournamentRound.getRound());
                            if(!nextTournamentRound.getIsRoundReady()) {
                                TournamentCourse updatedTournamentCourse = prepareNextTournamentRound(tournamentRound.getRound(), tournament.getTournamentCourse());
                                tournament.setTournamentCourse(updatedTournamentCourse);
                                tournamentRepository.save(tournament);
                            }

                        }
                    }
                });
            }
        });
    }

    public List<UserTournament> organizeTournamentForUsers(Tournament tournament){

        List<UserTournament> userTournaments = new ArrayList<>();

       for( int i=0; i<tournament.getUsers().size(); i+=2){
           List<TournamentUserDto> tournamentUserDtoList = tournament.getUsers().subList(i, i+2);

           UserTournament userTournament = UserTournament.builder()
                   .id(tournamentUserDtoList.get(0).getUsername() + tournamentUserDtoList.get(1).getUsername())
                   .firstUser(tournamentUserDtoList.get(0).getUsername())
                   .secondUser(tournamentUserDtoList.get(1).getUsername())
                   .firstUserResult("")
                   .secondUserResult("")
                   .isResultCorrect(false)
                   .build();

           userTournaments.add(userTournament);
       }

       return userTournaments;
    }

    public TournamentCourse prepareNextTournamentRound(Integer currentRound, TournamentCourse tournamentCourse){
        List<String> wonUsers = tournamentCourse.getTournamentRounds().get(currentRound-1)
                .getUserTournaments().stream().map( (userTournament) -> {
                    return userTournament.getFirstUserResult();
                }).collect(Collectors.toList());

        List<UserTournament> newUserTournaments = new ArrayList<>();

        for(int i=0; i< wonUsers.size(); i+=2){
            UserTournament userTournament = UserTournament.builder()
                    .id(wonUsers.get(i) + wonUsers.get(i+1))
                    .firstUser(wonUsers.get(i))
                    .secondUser(wonUsers.get(i+1))
                    .firstUserResult("")
                    .secondUserResult("")
                    .isResultCorrect(false)
                    .build();
            newUserTournaments.add(userTournament);
        }

        tournamentCourse.getTournamentRounds().get(currentRound).setIsRoundReady(true);
        tournamentCourse.getTournamentRounds().get(currentRound).setUserTournaments(newUserTournaments);

        return tournamentCourse;

    }

    public TournamentCourse organizeLadder(List<UserTournament> userTournaments){
        int tournamentRounds = getTournamentRoundCount(userTournaments.size());
        System.out.println("==============================");
        System.out.println("tournament rounds : " + tournamentRounds);
        System.out.println("==============================");
        List<TournamentRound> tournamentRoundList = new ArrayList<>();
        for(int i=1; i<=tournamentRounds; i++){
            if(i==1){
                TournamentRound tournamentRound = TournamentRound.builder()
                        .isRoundEnd(false)
                        .isRoundReady(true)
                        .round(i)
                        .userTournaments(userTournaments)
                        .build();
                tournamentRoundList.add(tournamentRound);
            }else {
                TournamentRound tournamentRound = TournamentRound.builder()
                        .isRoundEnd(false)
                        .isRoundReady(false)
                        .round(i)
                        .userTournaments(Collections.emptyList())
                        .build();
                tournamentRoundList.add(tournamentRound);
            }
        }

        return TournamentCourse.builder()
                .tournamentRounds(tournamentRoundList)
                .build();

    }

    public Integer getTournamentRoundCount(Integer userTournamentCount){
        double selectedPower = 0;
        for(double i=1; i<= 32; i++){
            if(Math.pow(2.0, i) == (userTournamentCount.doubleValue()*2.0)){
                selectedPower = i;
                break;
            }
        }
        System.out.println("selected power : " + selectedPower);
        return Double.valueOf(selectedPower).intValue();
    }
}
