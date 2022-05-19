import { useState } from "react";
import { Button } from "../components/Button/Button";
import { Input } from "../components/Input/Input";
import { Flex, SigningModalWrapper } from "../view/SigningForm/SigningForm.styled";

export const ConfirmTokenModal = ({onModalClose, onModalSave, saveButtonTitle, closeButtonTitle}) => {

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

    return(
      <SigningModalWrapper>
      <Input onChange={onModalInputChange} placeholder="email" name="username" />
      <Input onChange={onModalInputChange} placeholder="confirmation token" name="token"/>
      <Flex>
        <Button text={saveButtonTitle} onClick={onSave}/>
        <Button text={closeButtonTitle} onClick={onClose}/>
      </Flex>
    </SigningModalWrapper>
    )
  }