import styled from "styled-components";
import { colors } from "../theme";

export const TournamentDetialsModalWrapper = styled.div`
    width: 100%;
    height: 100%;
    color: ${colors.white};
    letter-spacing: 1px;
`
export const TournamentDetialsTitle = styled.div`
    font-size: 30px;
    border-bottom: 1px solid ${colors.white}
`
export const TournamentStatus = styled.div`
    color: ${props => props.color};
    font-size:20px;
`
export const TitleHeaderFlex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 3rem;
`
export const TournamentDetailsTextKey = styled.div`
    font-size: 20px;
    color: ${colors.brownOrange};
    font-weight: bold;
`
export const TournamentDetailsTextValue = styled(TournamentDetailsTextKey)`
    color: ${colors.white};
    font-weight: normal;
    margin: 0rem 1rem;
`
export const Flex = styled.div`
    display: flex;
    margin: .3rem 0;
`

export const TournamentRoundField = styled.div`
    width: 25rem;
    min-height: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${colors.lightGray};
    border-radius: 10px;
    padding: .5rem 0rem;
    margin: .5rem 0rem;
`
export const InfoContainer = styled.div`
    width: 50%;
`

export const TournamentRoundContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 50%;
    height: 100%;
`
export const TournamentRoundText = styled.div`
    font-size: 20px;
    font-weight: ${props => props.bold ? "bold" : "normal"};
    color: ${props => props.color || colors.mediumDarkBlue};
`
export const TournamentRoundUserField = styled.div`
    width: 80%;
    height: 2rem;
    border: 1px solid white;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${colors.white};
    border-radius: 10px;
    margin: .2rem 0rem;
`