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