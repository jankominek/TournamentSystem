import styled from 'styled-components';
import { colors } from '../../utils/theme';

export const InputWrapper = styled.input`
    width: 18rem;
    height: 2.8rem;
    color: ${props => props.disabled ? colors.white : ''};
    padding: 0px 5px;
    border: 2px solid gray;
    border-radius: 10px;
    font-size: 19px;
    margin: .5rem .5rem;
    &:focus{
        outline: none;
    }
`