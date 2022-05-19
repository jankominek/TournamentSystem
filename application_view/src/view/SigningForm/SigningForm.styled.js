import styled from 'styled-components';
import { colors } from '../../utils/theme';

export const SigningFormWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const SigningBox = styled.div`
    padding: 5rem 8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: ${colors.white};
`

export const SigningModalWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    // border: 1px solid ${colors.white};
`
export const Flex = styled.div`
    display: flex;
`