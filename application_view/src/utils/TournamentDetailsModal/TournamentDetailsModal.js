import React, { useEffect, useState } from 'react'
import { Flex, InfoContainer, TitleHeaderFlex, TournamentDetailsText, TournamentDetailsTextKey, TournamentDetailsTextValue, TournamentDetialsModalWrapper, TournamentDetialsTitle, TournamentRoundContainer, TournamentRoundField, TournamentRoundText, TournamentRoundUserField, TournamentStatus } from './TournamentDetailsModal.styled'
import {Button} from '../../components/Button/Button';
import { colors } from '../theme';
export const TournamentDetialsModal = ({tournament, isTournamentFully, onModalClose, 
  onModalJoin, joinButtonTitle, closeButtonTitle, isMyTournamentsPage}) => {

    const [rounds, setRounds] = useState();

    useEffect( () => {

    }, [])

    console.log("tournament : ", tournament)
    const prepareRounds = () => {
        const selectedRounds = tournament.tournamentCourse.tournamentRounds.filter( tour => tour.isRoundReady);
        const mappedRounds = selectedRounds.map( (round) => (
          <TournamentRoundField>
            asd
            <TournamentRoundText bold color={colors.brownOrange}>Round : {round.round}</TournamentRoundText>
            {round.userTournaments.map( (userTour) => (
              <TournamentRoundUserField>
                <TournamentRoundText>{userTour.firstUser}</TournamentRoundText>
                <TournamentRoundText>vs</TournamentRoundText>
                <TournamentRoundText>{userTour.secondUser}</TournamentRoundText>
                
            </TournamentRoundUserField>
            ))}
          </TournamentRoundField>
        ))
        return(
            <>
            {mappedRounds}
            </>
        )


    }

  return (
    <TournamentDetialsModalWrapper>
      <TitleHeaderFlex>
        <TournamentDetialsTitle>
          Tournament: {tournament?.name}
        </TournamentDetialsTitle>
        <TournamentStatus color={isTournamentFully ? "red" : "green"}>
          {isTournamentFully ? "You can not sign up for the tournament" : "You can sign up for the tournament"}
        </TournamentStatus>
      </TitleHeaderFlex>
      <Flex>
        <InfoContainer>
        <Flex>
        <TournamentDetailsTextKey>Organizer : </TournamentDetailsTextKey>
        <TournamentDetailsTextValue>{tournament?.organizer}</TournamentDetailsTextValue>
      </Flex>
      <Flex>
        <TournamentDetailsTextKey>Discipline : </TournamentDetailsTextKey>
        <TournamentDetailsTextValue>{tournament?.discipline}</TournamentDetailsTextValue>
      </Flex>
      <Flex>
        <TournamentDetailsTextKey>Start date : </TournamentDetailsTextKey>
        <TournamentDetailsTextValue>{tournament?.startDate}</TournamentDetailsTextValue>
      </Flex>
      <Flex>
        <TournamentDetailsTextKey>End date : </TournamentDetailsTextKey>
        <TournamentDetailsTextValue>{tournament?.endDate}</TournamentDetailsTextValue>
      </Flex>
      <Flex>
        <TournamentDetailsTextKey>Min rank : </TournamentDetailsTextKey>
        <TournamentDetailsTextValue>{tournament?.minRank}</TournamentDetailsTextValue>
      </Flex>
      <Flex>
        <TournamentDetailsTextKey>Max participants : </TournamentDetailsTextKey>
        <TournamentDetailsTextValue>{tournament?.maxParticipants}</TournamentDetailsTextValue>
      </Flex>
      <Flex>
        <TournamentDetailsTextKey>Player number : </TournamentDetailsTextKey>
        <TournamentDetailsTextValue>{tournament?.playerNumber}</TournamentDetailsTextValue>
      </Flex>
      <Flex>
        <TournamentDetailsTextKey>Users : </TournamentDetailsTextKey>
        {tournament?.users && tournament.users.map( (user) => <TournamentDetailsTextValue>{user.firstName + " " +user.lastName}</TournamentDetailsTextValue>)}
      </Flex>
      
      <Flex>
      <Button text={joinButtonTitle} onClick={onModalJoin}/>
      <Button text={closeButtonTitle} onClick={onModalClose}/>
      </Flex>
        </InfoContainer>
        <TournamentRoundContainer>
          {tournament && prepareRounds()}
        </TournamentRoundContainer>
      </Flex>
    </TournamentDetialsModalWrapper>
  )
}
