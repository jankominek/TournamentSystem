import React from 'react'
import { colors } from '../../utils/theme';
import { DateField, Flex, TournamentComponentWrapper, TournamentContentText } from './Tournament.styled'

export const Tournament = (props) => {

  const {name, discipline, organizer, startDate, endDate} = props;
  return (
    <TournamentComponentWrapper>
      <TournamentContentText fontSize="35px" weight="bold" color={colors.brownOrange}>{name}</TournamentContentText>
      <TournamentContentText fontSize="20px" >{discipline}</TournamentContentText>
      <TournamentContentText fontSize="14px" >Tournament organizator {organizer}</TournamentContentText>
      <DateField>
        <TournamentContentText fontSize="18px" >starting date : {startDate}</TournamentContentText>
        <TournamentContentText fontSize="18px" >ending date : {endDate}</TournamentContentText>
      </DateField>
      
    </TournamentComponentWrapper>
  )
}
