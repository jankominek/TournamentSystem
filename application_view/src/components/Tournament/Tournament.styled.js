import styled from "styled-components";
import { colors } from "../../utils/theme";

export const TournamentComponentWrapper = styled.div`
    width: 50rem;
    height: 15rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${colors.lightGray};
    border-radius: 10px;
    margin: 1rem 0rem;
    // border: 2px solid ${colors.orange};
`
// export const TournamentContentFie
export const TournamentContentText = styled.div`
    font-size: ${props => props.fontSize || "15px"};
    font-weight: ${props => props.weight || "normal"};
    color: ${props => props.color || colors.mediumDarkBlue};
    margin: .5rem 2rem;
`
export const Flex = styled.div`
    display: flex;
`
export const DateField = styled(Flex)`
    padding: .5rem 1rem;
    background: ${colors.mediumGray};
    border-radius: 10px;
`