package com.service.application_service.service;

import com.service.application_service.model.Tournament;
import com.service.application_service.repository.TournamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class TournamentService {

    @Autowired
    TournamentRepository tournamentRepository;

    public Tournament getTournamentByName(String name) {
        return tournamentRepository.findTournamentByName(name).orElseThrow(
                () -> new NoSuchElementException("Tournament does not exists")
        );
    }

}
