import React, { useState } from 'react'
import { InputWrapper } from './Input.styled'

export const Input = (props) => {
    const {onChange, placeholder, name, type} = props;

    const onChangeInput = (e) => {
            
    }

  return (
    <InputWrapper onChange={onChange} 
                    placeholder={placeholder || ""}
                    name={name || ""}
                    autoComplete="off"
                    type={type || "text"}
                    />
  )
}
