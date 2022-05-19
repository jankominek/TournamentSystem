import React, { useState } from 'react'
import { Button } from '../components/Button/Button'
import { Input } from '../components/Input/Input'
import { ModalFlex, ModalTitle, ModalWrapper } from './ModalWrapper'

export const CreateTournamentModal = ({onModalClose, onModalSave, saveButtonTitle, closeButtonTitle}) => {

    const [modalData, setModalData] = useState();

    const onModalInputChange = (e) => {
        setModalData({
          ...modalData,
          [e.target.name] : e.target.value
        })
      }


    const onSave = () => {
        onModalSave(modalData);
        onClose();
      }
  
      const onClose = () => onModalClose();
   

  return (
    <ModalWrapper>
        <ModalTitle>Create tournament</ModalTitle>
        <Input onChange={onModalInputChange} placeholder="name" name="name" />
        <Input onChange={onModalInputChange} placeholder="discipline" name="discipline" />
        <Input onChange={onModalInputChange} placeholder="organizer" name="organizer" />
        <Input onChange={onModalInputChange} placeholder="start date" name="startDate" />
        <Input onChange={onModalInputChange} placeholder="end date" name="endDate" />
        <Input onChange={onModalInputChange} placeholder="max of participants" name="maxParticipants" />
        <Input onChange={onModalInputChange} placeholder="min rank" name="minRank" />
        <ModalFlex>
            <Button text={saveButtonTitle} onClick={onSave}/>
            <Button text={closeButtonTitle} onClick={onClose}/>
        </ModalFlex>
    </ModalWrapper>
    
  )
}
