package com.service.application_service.controller;

import com.service.application_service.model.Tournament;
import com.service.application_service.service.TournamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/service/api/tournament")
public class TournamentController {

    @Autowired
    TournamentService tournamentService;

    @PostMapping("/create")
    public void createTournament(){

    }

    @GetMapping("/{name}")
    public Tournament getTournamentByName(@PathVariable String name){
        return tournamentService.getTournamentByName(name);
    }

    @PostMapping("/edit/{tournamentId}")
    public void editTournamentById(){

    }
}
