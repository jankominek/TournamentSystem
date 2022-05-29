import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import { Modal } from '../../components/Modal/Modal'
import { Search } from '../../components/SearchComponent/Search'
import { Tournament } from '../../components/Tournament/Tournament'
import { CreateTournamentModal } from '../../utils/CreateTournamentModal'
import { colors } from '../../utils/theme'
import axios from 'axios';
import { ButtonContainer, Flex, TournamentButtonContainer, TournamentPageHeader, TournamentPageTitleContainer, TournamentPageWrapper, TournamentUserName } from './TournamentPage.styled'
import { setTournamentState } from '../../redux/Tournaments'
import { createTournamentValidator, dateValidation, numberValidation, textValidation } from '../../utils/validators/createTournamentValidator'
import { PageingComponent } from '../../components/PageingComponent/PageingComponent'
import {toast } from 'react-toastify';

export const TournamentPage = () => {

    const [isTournamenModalShowing, setIsTournamentModalShowing] = useState(false);
    const [tournaments, setTournaments] = useState([]);
    const navigate = useNavigate();

    const userState = useSelector( state => state.user);
    const tournamentsState = useSelector(state => state.tournaments.tournaments)
    const dispatch = useDispatch();

    useEffect( () => {
        getAllTournaments();
    }, [])

    const getAllTournaments = () => {
        axios.get(`http://localhost:8079/service/api/tournament/all`)
        .then( response => {
            setTournaments([...response.data]);
            dispatch(setTournamentState([...response.data]))
        })
    }

    const tournamentList = tournaments && tournaments.map( (tournament) => (
        <Tournament   tournamentId={tournament.id}
                        name={tournament.name}
                        discipline={tournament.discipline}
                        organizer={tournament.organizer}
                        startDate={tournament.startDate}
                        endDate={tournament.endDate}
                        getAllTournaments={getAllTournaments}
            />
    ))

   
        
    const onLoginButtonClick = () => navigate("/login");

    const onRegisterButtonClick = () => navigate("/register");

    const buttonProps = {
        padding : ".5rem 2rem",
        background : colors.orange, 
        color: colors.mediumDarkBlue,
        fontSize: "16px"
    }

    const createTournamentButtonProps = {
        padding : ".8rem 3rem",
        background : colors.orange, 
        color: colors.mediumDarkBlue,
        fontSize: "18px"
    }

    const onSearchChange = (data) => {
        setTournaments(data);
    }

    const createTournament = () => {
        setIsTournamentModalShowing(true);
    }

    const onTournamentModalSave = (data, validation) => {
        if(validation){
            onTournamentModalClose();
            axios.post("http://localhost:8079/service/api/tournament/create", data)
                        .then(response =>{
                            getAllTournaments();
                            toast.success("Tournament created")

                        }).catch( err => {
                            toast.error(err.response.data.message);
                        })
        }
        
    }
    const onTournamentModalClose = () => setIsTournamentModalShowing(false);

    const onMyTournamentsClick = () => {
        navigate("/mytournaments");
    }

    const tournamentModalParams = {
        onModalSave : onTournamentModalSave,
        onModalClose : onTournamentModalClose,
        saveButtonTitle : "create",
        closeButtonTitle : "close"
    }

    const onPageChange = (data) => {
        setTournaments(data);
    }

    console.log("tournament page reload..")
  return (
        <TournamentPageWrapper>
            <TournamentPageHeader>
                <TournamentPageTitleContainer>
                    Tournament system
                </TournamentPageTitleContainer>
                <ButtonContainer>
                    {userState.username && <TournamentUserName>Hello, {userState.firstName + '  ' + userState.lastName} | rank : {userState.rank}</TournamentUserName>}
                    <Button text="login" onClick={onLoginButtonClick} {...buttonProps}/>
                    <Button text="register" onClick={onRegisterButtonClick} {...buttonProps}/>
                </ButtonContainer>
            </TournamentPageHeader>
            {userState.username && <TournamentButtonContainer>
                <Button text="create tournament" onClick={createTournament} {...createTournamentButtonProps}/>
                <Button text="my tournaments" onClick={onMyTournamentsClick} {...createTournamentButtonProps}/>
            </TournamentButtonContainer>}
            <Search onSearchChange={onSearchChange}
                    placeholder="search tournament by name.."
            />

            {tournamentList}
            {tournamentsState && <PageingComponent data={tournamentsState} onPageChange={onPageChange}/>}
            {isTournamenModalShowing && <Modal body={<CreateTournamentModal {...tournamentModalParams}/>}
                                                    width="60rem"
                                                    height="50rem"/>}
                             
        </TournamentPageWrapper>
  )
}
