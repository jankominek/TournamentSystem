import React from 'react'
import { ButtonWrapper } from './Button.styled'

export const Button = (props) => {
    const {text, onClick, padding, background, color, fontSize} = props;

  return (
    <ButtonWrapper onClick={onClick}
                    padding={padding}
                    background={background}
                    color={color}
                    fontSize={fontSize}
    >
        {text}
    </ButtonWrapper>
  )
}
