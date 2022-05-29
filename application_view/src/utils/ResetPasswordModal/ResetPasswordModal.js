import React, { useState } from 'react'
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input'
import { Flex, ResetPasswordModalForm, ResetPasswordModalWrapper } from './ResetPasswordModal.styled'

export const ResetPasswordModal = ({onModalClose, onModalSave, saveButtonTitle, closeButtonTitle}) => {
    const [userCredentials , setUserCredentials] = useState();

    const onChangeInput = (e) => {
        setUserCredentials({
          ...userCredentials,
          [e.target.name] : e.target.value
        });
    }

    const onSave = () => {
        onModalSave(userCredentials);
    }

  return (
    <ResetPasswordModalWrapper>
        <ResetPasswordModalForm>
            <Input onChange={onChangeInput} placeholder="email" name="username" />
            <Input onChange={onChangeInput} placeholder="token" name="token" />
            <Input onChange={onChangeInput} placeholder="password" name="password" />
            <Flex>
                <Button text={saveButtonTitle} onClick={onSave}/>
                <Button text={closeButtonTitle} onClick={onModalClose}/>
            </Flex>
        </ResetPasswordModalForm>
    </ResetPasswordModalWrapper>
  )
}
