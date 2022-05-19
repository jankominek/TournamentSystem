import React, { useState } from 'react'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import { Flex, SigningBox, SigningFormWrapper, SigningModalWrapper } from './SigningForm.styled'
import axios from 'axios';
import { Modal } from '../../components/Modal/Modal';
import { ConfirmTokenModal } from '../../utils/ConfirmTokenModal';

export const SigningForm = (props) => {

  const {isLoginPage} = props;

  const [userCredentials, setUserCredentials] = useState({});
  const [isModalShowing, setIsModalShowing] = useState(false);

    const onChangeInput = (e) => {
        setUserCredentials({
          ...userCredentials,
          [e.target.name] : e.target.value
        });
    }

    console.log("state : ", userCredentials)

    const onLoginClick = () => {
      axios.post("http://localhost:8079/login", userCredentials)
        .then( (response) => {
            console.log(response);
        })
    }

    const onRegisterClick = () => {
        axios.post("http://localhost:8079/register", userCredentials)
          .then( (response) => {
              response.data && setIsModalShowing(true);
          })
    }

    const onModalClose = () => {
      setIsModalShowing(false);
    }

    const onModalSave = (data) => {
      axios.post("http://localhost:8079/register/confirm", data)
        .then( (response) => {
          console.log(response.data)
        })
    }

    const modalParams = {
        onModalSave : onModalSave,
        onModalClose : onModalClose,
        saveButtonTitle : "Save",
        closeButtonTitle : "Close"
    }

  return (
    <SigningFormWrapper>
        <SigningBox>
            {!isLoginPage && <Input onChange={onChangeInput} placeholder="first name" name="fname"/>}
            {!isLoginPage && <Input onChange={onChangeInput} placeholder="last name" name="lname"/>}
            <Input onChange={onChangeInput} placeholder="email" name="username"/>
            <Input onChange={onChangeInput} placeholder="password" name="password" type="password"/>
            {isLoginPage ? <Button text="Login" onClick={onLoginClick}/> :
                                            <Button text="Register" onClick={onRegisterClick}/>}
        </SigningBox>
        {isModalShowing && <Modal body={<ConfirmTokenModal {...modalParams}/>}/>}
    </SigningFormWrapper>
  )
}
