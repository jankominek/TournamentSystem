import styled from 'styled-components';
import { colors } from '../../utils/theme';

export const ButtonWrapper = styled.div`
    padding: ${props => props.padding || "1rem 3rem"};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: ${props => props.fontSize || "18px"};
    border-radius: 10px;
    margin: .5rem .5rem;
    background: ${props => props.background || colors.gray};
    color: ${ props => props.color || colors.white};
`