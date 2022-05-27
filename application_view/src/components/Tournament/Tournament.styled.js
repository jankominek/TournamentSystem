import styled from "styled-components";
import { colors } from "../../utils/theme";

export const TournamentComponentWrapper = styled.div`
    width: 50rem;
    min-height: 15rem;
    display: flex;
    padding-bottom: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${colors.lightGray};
    border-radius: 10px;
    margin: 1rem 0rem;
    position: relative;
    // border: 2px solid ${colors.orange};
`
// export const TournamentContentFie
export const TournamentContentText = styled.div`
    font-size: ${props => props.fontSize || "15px"};
    font-weight: ${props => props.weight || "normal"};
    color: ${props => props.color || colors.mediumDarkBlue};
    margin: .5rem 2rem;
`

export const DetailsField = styled.div`
    font-size: 15px;
    cursor: pointer;
    position: absolute;
    padding: 1rem 1rem;
    color: ${colors.gray};
    font-weight: bold;
    letter-spacing:1px;
    right: 0;
    top: 0;
`
export const Flex = styled.div`
    display: flex;
`
export const DateField = styled(Flex)`
    padding: .5rem 1rem;
    background: ${colors.mediumGray};
    border-radius: 10px;
`
export const UserWinnerField = styled.div`
    padding: .5rem 0rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
export const UserWinnerTextTitle = styled.div`
    font-size: 25px;
    padding: .5rem 2rem;
    font-weight: bold;
    color: ${colors.brownOrange};
`
export const UserWinnerName = styled(UserWinnerTextTitle)`
    font-weight: normal;
    font-size: 20px;
`