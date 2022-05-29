import styled from "styled-components";
import { colors } from "../../utils/theme";

export const ForgotPasswordPageWrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ForgotPasswordForm = styled.div`
    width: 40rem;
    height: 30rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${colors.white};
    border-radius: 10px;
`