import styled from "styled-components";
import { colors } from "../../utils/theme";

export const PagingWrapper = styled.div`
    display: flex;
    padding: 1rem 2rem;
    // position: static;
    // box-sizing: border-box;
    // padding: 5rem 0rem;
    bottom:0;
`
export const PagingElement = styled.div`
    font-size: 15px;
    padding: 1rem 1.5rem;
    cursor: pointer;
    color: ${colors.white};
    border: 1px solid ${colors.white};
    border-radius: 100px;
    margin: 0rem 1rem;
    &:hover{
        background: ${colors.white};
        color: ${colors.mediumDarkBlue};
    }
`