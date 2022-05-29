import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '../components/Button/Button'
import { Input } from '../components/Input/Input'
import { ErrorMessage, ModalFlex, ModalTitle, ModalWrapper } from './ModalWrapper'
import { createTournamentValidator } from './validators/createTournamentValidator'
const types = [
  {
      name: "name",
      type:"text"
  },
  {
      name: "discipline",
      type:"text"
  },
  {
      name: "organizator",
      type:"text"
  },
  {
      name: "startDate",
      type:"date"
  },
  {
      name: "endDate",
      type:"date"
  },
  {
      name: "maxParticipants",
      type:"number"
  },
  {
      name: "minRank",
      type:"number"
  },
]


export const CreateTournamentModal = ({onModalClose, onModalSave, saveButtonTitle, closeButtonTitle}) => {

    const [modalData, setModalData] = useState();
    const [errorMessage , setErrorMessage] = useState("");

    const userState = useSelector( state => state.user);

    useEffect( () => {
      setModalData({
        ...modalData,
        organizer : userState.username
      })
    }, [])

    const onModalInputChange = (e) => {
        setModalData({
          ...modalData,
          [e.target.name] : e.target.value
        })
      }

    const onSave = () => {
    const validationResult = createTournamentValidator(modalData, types)
    setErrorMessage(validationResult);
        if(!validationResult){
            onModalSave(modalData, !validationResult);
        }
      }
  
      const onClose = () => onModalClose();
   

  return (
    <ModalWrapper>
        <ModalTitle>Create tournament</ModalTitle>
        <Input onChange={onModalInputChange} placeholder="name" name="name" />
        <Input onChange={onModalInputChange} placeholder="discipline" name="discipline" />
        <Input onChange={onModalInputChange} placeholder="organizer" name="organizer" value={userState.username} disabled/>
        <Input onChange={onModalInputChange} placeholder="start date YYYY-MM-DD HH:MM" name="startDate" />
        <Input onChange={onModalInputChange} placeholder="end date YYYY-MM-DD HH:MM" name="endDate" />
        <Input onChange={onModalInputChange} placeholder="max of participants" name="maxParticipants" />
        <Input onChange={onModalInputChange} placeholder="min rank" name="minRank" />
        <ModalFlex>
            <Button text={saveButtonTitle} onClick={onSave}/>
            <Button text={closeButtonTitle} onClick={onClose}/>
        </ModalFlex>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </ModalWrapper>
    
  )
}
