import styled from 'styled-components';
import { colors } from '../../utils/theme';

export const ModalWrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left:0;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ModalBackground = styled.div`
    width: 100%;
    min-height: 100%;
    position: absolute;
    background: ${colors.white};
    opacity: .4;
`

export const ModalBox = styled.div`
    width: ${props => props.width || "50rem"};
    height: ${props => props.height || "30rem"};
    display: flex;
    z-index: 1;
    background: ${colors.mediumDarkBlue};
    justify-content: center;
    align-items: center;
    opacity: 1;
    border-radius: 10px;
`
export const ModalContent = styled.div`
    width: 80%;
    height: 80%;
`