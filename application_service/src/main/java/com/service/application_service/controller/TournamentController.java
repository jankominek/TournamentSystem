package com.service.application_service.controller;

import com.service.application_service.DTO.JoinTournament;
import com.service.application_service.DTO.TournamentDto;
import com.service.application_service.model.Tournament;
import com.service.application_service.service.TournamentService;
import com.service.application_service.utils.UpdatedUserTournament;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/service/api/tournament")
public class TournamentController {

    @Autowired
    TournamentService tournamentService;

    @GetMapping("/all")
    public List<TournamentDto> getAll(){
        return tournamentService.getAll();
    }

    @GetMapping("/userTournaments/{user}")
    public List<Tournament> getUserTournaments(@PathVariable String user){
        return tournamentService.getUserTournaments(user);
    }

    @PostMapping("/userTournament/result")
    public Boolean saveTournamentResult(@RequestBody UpdatedUserTournament updatedUserTournament){
        System.out.println(updatedUserTournament.getName());
        return tournamentService.saveTournamentResult(updatedUserTournament);
    }

    @PostMapping("/create")
    public void createTournament(@RequestBody TournamentDto tournamentDto){
        tournamentService.createTournament(tournamentDto);
    }

    @PostMapping("/join")
    public Boolean joinToTournament(@RequestBody JoinTournament joinTournament){
        return tournamentService.joinTournament(joinTournament);
    }

    @GetMapping("/{id}")
    public Tournament getTournamentById(@PathVariable String id){
        return tournamentService.getTournamentById(id);
    }

    @PostMapping("/edit/{tournamentId}")
    public void editTournamentById(){

    }
}
