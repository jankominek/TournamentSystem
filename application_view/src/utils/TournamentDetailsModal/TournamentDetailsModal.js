import React from 'react'
import { Flex, TournamentDetailsText, TournamentDetailsTextKey, TournamentDetailsTextValue, TournamentDetialsModalWrapper, TournamentDetialsTitle } from './TournamentDetailsModal.styled'
import {Button} from '../../components/Button/Button';
export const TournamentDetialsModal = ({tournament, onModalClose, onModalJoin, joinButtonTitle, closeButtonTitle}) => {


  return (
    <TournamentDetialsModalWrapper>
      <TournamentDetialsTitle>
        Tournament: {tournament?.name}
      </TournamentDetialsTitle>
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
        {/* {tournament?.users && tournament.users.map( (user) => <TournamentDetailsTextValue>{user.firstName}</TournamentDetailsTextValue>)} */}
      </Flex>
      
      <Flex>
      <Button text={joinButtonTitle} onClick={onModalJoin}/>
      <Button text={closeButtonTitle} onClick={onModalClose}/>
      </Flex>
    </TournamentDetialsModalWrapper>
  )
}
