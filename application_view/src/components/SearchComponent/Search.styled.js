import styled from "styled-components";
import { colors } from "../../utils/theme";

export const SearchWrapper = styled.input`
    width: 17rem;
    height: 1.5rem;
    background: ${colors.lightGray};
    padding: .5rem .5rem;
    border: 1.5px solid ${colors.gray};
    color: ${colors.gray};
    border-radius: 10px;
    font-size: 15px;
    &:focus{
        outline: none;
    }
`