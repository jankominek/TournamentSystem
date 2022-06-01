import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../utils/theme';
import { TournamentDetialsModal } from '../../utils/TournamentDetailsModal/TournamentDetailsModal';
import { TournamentGameModal } from '../../utils/TournamentGameModal/TournamentGameModal';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { DateField, DetailsField, Flex, TournamentComponentWrapper, TournamentContentText, UserWinnerField, UserWinnerName, UserWinnerTextTitle } from './Tournament.styled'

export const Tournament = (props) => {

  const {name, discipline, organizer, startDate, endDate, tournamentId, getAllTournaments, isMyTournamentsPage} = props;
  const [tournament, setTournament] = useState();
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [isModalPlayTournamentShowing, setIsModalPlayTournamentShowing] = useState(false);

  const userState = useSelector(state => state.user);

  const navigate = useNavigate();

  const isTournamentFully = !(tournament?.users?.length < tournament?.maxParticipants);

  useEffect( () => {
    getTournamentById();
  }, [])

  const getTournamentById = () => {
    axios.get(`http://localhost:8079/service/api/tournament/${tournamentId}`)
      .then(response => {
          setTournament(response.data)
      }) 
  }

  const onShowDetailsClick = () => {
      setIsModalShowing(true);
      getTournamentById();
  };

  const onTournamentModalJoin = () => {
    const data = {
      tournamentId: tournamentId,
      username: userState.username
    }
    if(!isTournamentFully && userState.rank >= tournament.minRank){
      axios.post("http://localhost:8079/service/api/tournament/join", data)
      .then( response => {
          if(response.data){
            onTournamentModalClose();
          }
      })
    }
  };
const onTournamentModalClose = () => setIsModalShowing(false);

const onModalGameSave = (selectedUser) => {

  setIsModalPlayTournamentShowing(false);

  getTournamentById();
}
const onModalGameClose = () => {
    setIsModalPlayTournamentShowing(false);
    getTournamentById();
}


  const tournamentModalParams = {
    onModalJoin : onTournamentModalJoin,
    onModalClose : onTournamentModalClose,
    joinButtonTitle : "join",
    closeButtonTitle : "close"
  }

  const tournamentModalGameParams = {
    onModalSave : onModalGameSave,
    onModalClose : onModalGameClose,
    saveButtonTitle : "save",
    closeButtonTitle : "close"
  }

  const onPlayTournament = () => {
    setIsModalPlayTournamentShowing(true);
  }; 

  return (
    <>
    <TournamentComponentWrapper>
      {userState.username && <DetailsField onClick={onShowDetailsClick}>Show details</DetailsField>}
      <TournamentContentText fontSize="35px" weight="bold" color={colors.brownOrange}>{name}</TournamentContentText>
      <TournamentContentText fontSize="20px" >{discipline}</TournamentContentText>
      {tournament?.status && 
        <UserWinnerField>
          <UserWinnerTextTitle>Winner of tournament</UserWinnerTextTitle>
          <UserWinnerName>{tournament.tournamentWinner}</UserWinnerName>
        </UserWinnerField>
      }
      {tournament && tournament.canceled && !tournament?.status &&
        <UserWinnerField>
          <UserWinnerTextTitle color="red">Canceled</UserWinnerTextTitle>
        </UserWinnerField>
      }
      {isMyTournamentsPage && tournament?.isReady && !tournament?.status && <Button text={"play"} onClick={onPlayTournament}
                                                    background="lightGreen"
                                                    color={colors.mediumDarkBlue}/>}
      <TournamentContentText fontSize="14px" >Tournament organizator {organizer}</TournamentContentText>
      <DateField>
        <TournamentContentText fontSize="18px" >starting date : {startDate}</TournamentContentText>
        <TournamentContentText fontSize="18px" >ending date : {endDate}</TournamentContentText>
      </DateField>
    </TournamentComponentWrapper>

    {isModalShowing && <Modal body={<TournamentDetialsModal tournament={tournament} 
    isTournamentFully={isTournamentFully} isMyTournamentsPage={isMyTournamentsPage} {...tournamentModalParams}/>} width="70rem"/>}

    {isModalPlayTournamentShowing && <Modal body={<TournamentGameModal 
    tournament={tournament} {...tournamentModalGameParams}/>} width="70rem" height="35rem"/>}
    </>
  )
}
