import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import { Modal } from '../../components/Modal/Modal'
import { Search } from '../../components/SearchComponent/Search'
import { Tournament } from '../../components/Tournament/Tournament'
import { CreateTournamentModal } from '../../utils/CreateTournamentModal'
import { colors } from '../../utils/theme'
import { ButtonContainer, Flex, TournamentButtonContainer, TournamentPageHeader, TournamentPageTitleContainer, TournamentPageWrapper } from './TournamentPage.styled'

export const TournamentPage = () => {

    const [isTournamenModalShowing, setIsTournamentModalShowing] = useState(false);
    const navigate = useNavigate();

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

    const onSearchChange = () => {

    }

    const createTournament = () => {
        setIsTournamentModalShowing(true);
    }

    const onTournamentModalSave = () => {
        
    }
    const onTournamentModalClose = () => setIsTournamentModalShowing(false);

    const tournamentModalParams = {
        onModalSave : onTournamentModalSave,
        onModalClose : onTournamentModalClose,
        saveButtonTitle : "create",
        closeButtonTitle : "close"
    }


  return (
        <TournamentPageWrapper>
            <TournamentPageHeader>
                <TournamentPageTitleContainer>
                    Tournament system
                </TournamentPageTitleContainer>
                <ButtonContainer>
                    <Button text="login" onClick={onLoginButtonClick} {...buttonProps}/>
                    <Button text="register" onClick={onRegisterButtonClick} {...buttonProps}/>
                </ButtonContainer>
            </TournamentPageHeader>
            <TournamentButtonContainer>
                <Button text="create tournament" onClick={createTournament} {...createTournamentButtonProps}/>
                {/* <Button text="register" onClick={onRegisterButtonClick} {...createTournamentButtonProps}/> */}
            </TournamentButtonContainer>
            <Search onSearchChange={onSearchChange}
                    placeholder="search tournament by name.."
            />

            <Tournament name="Example text"
                        discipline="Programming"
                        organizer="Jan Kominek"
                        startDate="02-03-2022"
                        endDate="02-04-2022"
            />
            {isTournamenModalShowing && <Modal body={<CreateTournamentModal {...tournamentModalParams}/>}
                                                    width="60rem"
                                                    height="50rem"/>}
        </TournamentPageWrapper>
  )
}
