import styled from "styled-components";
import { colors } from "../../utils/theme";

export const MyTournamentsPageWrapper = styled.div`
width: 100%;
min-height: 100%;
display: flex;
align-items: center;
flex-direction: column;
`
export const MyTournamentsTitle = styled.div`
    padding: 1rem 3rem;
    width: 40rem;
    margin: 1rem 0rem;
    font-size: 30px;
    letter-spacing: 1px;
    color: ${colors.white};
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid ${colors.orange};
`