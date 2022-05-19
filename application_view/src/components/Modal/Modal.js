import React, { useState } from 'react'
import { ModalBackground, ModalBox, ModalContent, ModalWrapper } from './Modal.styled'

export const Modal = (props) => {

    const {body, width, height} = props;


  return (
    <ModalWrapper>
        <ModalBackground />
        <ModalBox width={width} height={height}>
            <ModalContent>
                {body}
            </ModalContent>
        </ModalBox>
    </ModalWrapper>
  )
}
