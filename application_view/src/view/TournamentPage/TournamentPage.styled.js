import styled from 'styled-components';
import { colors } from '../../utils/theme';

export const TournamentPageWrapper = styled.div`
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`
export const TournamentPageHeader = styled.div`
    width: 100%;
    height: 10rem;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    // border: 1px solid white;
`
export const TournamentPageTitleContainer = styled.div`
    padding: 1rem 2rem;
    border-bottom: 2px solid orange;
    position: absolute;
    font-size: 40px;
    color: ${colors.white};
    font-weight: bold;
`
export const ButtonContainer = styled.div`
    padding: 1rem 2rem;
    display: flex;
    position: absolute;
    right: 1rem;
`
export const TournamentButtonContainer = styled.div`
    display: flex;
    margin-top: -2rem;
    padding: 1.5rem 0rem;
`