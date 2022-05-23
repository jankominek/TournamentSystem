import React from 'react'
import { Flex, TitleHeaderFlex, TournamentDetailsText, TournamentDetailsTextKey, TournamentDetailsTextValue, TournamentDetialsModalWrapper, TournamentDetialsTitle, TournamentStatus } from './TournamentDetailsModal.styled'
import {Button} from '../../components/Button/Button';
import { colors } from '../theme';
export const TournamentDetialsModal = ({tournament, isTournamentFully, onModalClose, 
  onModalJoin, joinButtonTitle, closeButtonTitle, isMyTournamentsPage}) => {

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
    </TournamentDetialsModalWrapper>
  )
}
