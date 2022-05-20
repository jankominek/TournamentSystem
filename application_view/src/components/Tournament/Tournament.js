import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../utils/theme';
import { TournamentDetialsModal } from '../../utils/TournamentDetailsModal/TournamentDetailsModal';
import { Modal } from '../Modal/Modal';
import { DateField, DetailsField, Flex, TournamentComponentWrapper, TournamentContentText } from './Tournament.styled'

export const Tournament = (props) => {

  const {name, discipline, organizer, startDate, endDate, tournamentId} = props;
  const [tournament, setTournament] = useState();
  const [isModalShowing, setIsModalShowing] = useState(false);

  const userState = useSelector(state => state.user);

  const navigate = useNavigate();

  useEffect( () => {
    axios.get(`http://localhost:8079/service/api/tournament/${tournamentId}`)
      .then(response => {
          setTournament(response.data)
      }) 
  }, [])
  console.log("TTT: ", tournament)

  const onShowDetailsClick = () => {
      setIsModalShowing(true);
  };

  const onTournamentModalJoin = () => {
    const data = {
      tournamentId: tournamentId,
      username: userState.username
    }
    axios.post("http://localhost:8079/service/api/tournament/join", data)
      .then( response => {
          if(response.data){
            onTournamentModalClose();
          }
      })

  };
const onTournamentModalClose = () => setIsModalShowing(false);


  const tournamentModalParams = {
    onModalJoin : onTournamentModalJoin,
    onModalClose : onTournamentModalClose,
    joinButtonTitle : "join",
    closeButtonTitle : "close"
  }

  return (
    <>
    <TournamentComponentWrapper>
      <DetailsField onClick={onShowDetailsClick}>Show details</DetailsField>
      <TournamentContentText fontSize="35px" weight="bold" color={colors.brownOrange}>{name}</TournamentContentText>
      <TournamentContentText fontSize="20px" >{discipline}</TournamentContentText>
      <TournamentContentText fontSize="14px" >Tournament organizator {organizer}</TournamentContentText>
      <DateField>
        <TournamentContentText fontSize="18px" >starting date : {startDate}</TournamentContentText>
        <TournamentContentText fontSize="18px" >ending date : {endDate}</TournamentContentText>
      </DateField>
    </TournamentComponentWrapper>
    {isModalShowing && <Modal body={<TournamentDetialsModal tournament={tournament} {...tournamentModalParams}/>} width="70rem"/>}
    </>
  )
}
