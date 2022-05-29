import styled from "styled-components";
import { colors } from "./theme";

export const ModalWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    // border: 1px solid ${colors.white};
`
export const ModalFlex = styled.div`
    display: flex;
`

export const ModalTitle = styled.div`
    font-size: 50px;
    display: flex;
    margin-top: -2rem;
    padding: 2rem 0rem;
    justify-content: center;
    align-items: center;
    color: ${colors.orange};
    font-weight: bold;
`
export const ErrorMessage = styled.div`
    font-size: 20px;
    padding: .5rem 1rem;
    color: red;
`