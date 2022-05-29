import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { PageingComponent } from '../../components/PageingComponent/PageingComponent';
import { Tournament } from '../../components/Tournament/Tournament';
import { MyTournamentsPageWrapper, MyTournamentsTitle, TournamentsWrapperContent } from './MyTournamentsPage.styled'

export const MyTournamentsPage = () => {

    const [userTournaments, setUserTournaments] = useState();

    const userState = useSelector( state => state.user);

    useEffect( () => {
        userState && axios.get(`http://localhost:8079/service/api/tournament/userTournaments/${userState.username}`)
            .then( response => {
                setUserTournaments(response.data)
            })
    }, [userState]);

    const onPageChange = (data) => {
        setUserTournaments(data);
    }

const tournamentList = userTournaments && userTournaments.map( (tournament) => (
    <Tournament   tournamentId={tournament.id}
                    name={tournament.name}
                    discipline={tournament.discipline}
                    organizer={tournament.organizer}
                    startDate={tournament.startDate}
                    endDate={tournament.endDate}
                    isMyTournamentsPage={true}
        />
));

  return (
    <MyTournamentsPageWrapper>
        <MyTournamentsTitle>My tournaments</MyTournamentsTitle>
            {tournamentList}
            {/* {userTournaments && <PageingComponent data={userTournaments} onPageChange={onPageChange}/>} */}
    </MyTournamentsPageWrapper>
  )
}
