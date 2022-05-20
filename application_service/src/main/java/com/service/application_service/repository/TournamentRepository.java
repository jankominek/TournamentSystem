package com.service.application_service.repository;

import com.service.application_service.model.Tournament;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TournamentRepository extends MongoRepository<Tournament, String> {

    Optional<Tournament> findTournamentByName(String name);
    Optional<Tournament> findTournamentById(String id);


}
