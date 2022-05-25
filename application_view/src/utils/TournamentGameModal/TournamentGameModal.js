import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button } from '../../components/Button/Button'
import { colors } from '../theme';
import { GameField, TournamentGameFlex, TournamentGameTitle, TournamentGameWrapper, UserGameField } from './TournamentGameModal.styled'

export const TournamentGameModal = ({tournament, onModalClose, 
    onModalSave, saveButtonTitle, closeButtonTitle}) => {

    const [userTournament, setUserTournament] = useState();
    const [selectedWinner, setSelectedWinner] = useState("");
    const [firstUser, setFirstUser] = useState();
    const [secondUser, setSecondUser] = useState();
    const [round, setRound] = useState();
    
    console.log("tournament modal game: ", tournament);

    const userState = useSelector(state => state.user);

    useEffect( () => {
        userState && tournament && selectCorrectUserTournament();
    }, [])

    useEffect( () => {
        setUsers();
    }, [userTournament])

    console.log("userTournament : ", userTournament)

    const selectCorrectUserTournament = () => {
        const tournamentRound = tournament.tournamentCourse.tournamentRounds.find( (tour) => tour.isRoundEnd == false);
        setRound(tournamentRound.round);
        const usrTournament = tournamentRound.userTournaments.filter( (usrTour) => usrTour.id.includes(userState.username));
        usrTournament && setFirstUser(usrTournament["firstUser"]);
        usrTournament && setSecondUser(usrTournament["secondUser"]);
        setUserTournament(usrTournament[0]);
    }

    const setUsers = () => {
        userTournament && setFirstUser(userTournament["firstUser"]);
        userTournament && setSecondUser(userTournament["secondUser"]);
    }

    const onUserFieldClick = (e) => {
        const user = e.target.id;
        setSelectedWinner(user);
        console.log("selected user: ", user);
    }
    const getKeyByValue = (object, value) =>  {
        return Object.keys(object).find(key => object[key] === value);
      }

    const saveGameResult = () => {

        const userKey = getKeyByValue(userTournament, userState.username);

        userTournament[userKey+"Result"] = selectedWinner;

        const tournamentToSave = {
            name: tournament.name,
            round: round,
            userTournament : userTournament,
            userTypeResult: userKey+"Result"
        }
        console.log("XXXXXXXXXXXX: ", tournamentToSave)

        
        axios.post(`http://localhost:8079/service/api/tournament/userTournament/result`, tournamentToSave)
            .then( (response) => {
                if(response.data == 1){

                }
            })
    }

    const onSave = () => {
      console.log("want to save");
        saveGameResult();
    }

    const dataIsLoaded = firstUser && secondUser;
  return (
    <TournamentGameWrapper>
     <TournamentGameTitle>
         Select winner of the match
     </TournamentGameTitle>
     <GameField>
         {dataIsLoaded && 
         <>
         <UserGameField id={firstUser} 
         onClick={onUserFieldClick}
         borderColor={selectedWinner == firstUser ? "mediumseagreen" : null}
         background={selectedWinner == firstUser ? "lightGreen" : null}
         >{firstUser}</UserGameField>
<UserGameField id={secondUser} 
         onClick={onUserFieldClick}
         borderColor={selectedWinner == secondUser ? "mediumseagreen" : null}
         background={selectedWinner == secondUser ? "lightGreen" : null}
         >{secondUser}</UserGameField>
         </>
         }
     </GameField>
   <TournamentGameFlex>
       <Button text={saveButtonTitle} onClick={onSave}/>
       <Button text={closeButtonTitle} onClick={onModalClose}/>
   </TournamentGameFlex>
 </TournamentGameWrapper>
  )
}
