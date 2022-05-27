import styled from "styled-components";
import { colors } from "../theme";

export const TournamentGameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const TournamentGameTitle = styled.div`
    font-size: 25px;
    color: ${colors.white};
    letter-spacing: 1px;
    padding: 1rem 3rem;
    border-bottom: 2px solid ${colors.orange};
    display: flex;
    justify-content: center;
    align-items: center;
`

export const TournamentGameFlex = styled.div`
    display: flex;
`

export const GameField = styled.div`
    display: flex;
    margin: 2rem 0rem;
    justify-content: space-evenly;
    align-items: center;
    width: 35rem;
    height: 15rem;
    background: ${colors.lightGray};
    border-radius: 10px;
`

export const UserGameField = styled.div`
    width: 40%;
    height: 12rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 5px solid ${props=> props.borderColor || colors.white};
    background: ${props=> props.background || colors.white};
    border-radius: 10px;
`

export const UserWinnerField = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const UserWinnerTextTitle = styled.div`
    font-size: 30px;
    padding: 1rem 2rem;
    font-weight: bold;
    color: ${colors.mediumDarkBlue};
`
export const UserWinnerName = styled(UserWinnerTextTitle)`
    font-weight: normal;
    font-size: 20px;
`