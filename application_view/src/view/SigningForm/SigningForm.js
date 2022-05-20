import React, { useEffect, useState } from 'react'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import { Flex, SigningBox, SigningFormWrapper, SigningModalWrapper } from './SigningForm.styled'
import axios from 'axios';
import { Modal } from '../../components/Modal/Modal';
import { ConfirmTokenModal } from '../../utils/ConfirmTokenModal';
import { useDispatch, useSelector } from 'react-redux';
import { setUserState } from '../../redux/User';
import { Navigate, useNavigate } from 'react-router-dom';
import { setAxiosHeaderAuthorization } from '../../utils/axiosConfiguration';

export const SigningForm = (props) => {

  const {isLoginPage} = props;

  const [userCredentials, setUserCredentials] = useState({});
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const userState = useSelector( state => state.user);
  const dispatch = useDispatch();
  console.log(userState);

  useEffect( () => {
    // setUserCredentials({});
  }, [])

  useEffect( () => {
    if(isLoggedIn){
        getUser();
        navigate("/")
    }
  }, [isLoggedIn])

  const getUser = () => {
      axios.get("http://localhost:8079/service/api/user/logged")
        .then( (response) => {
            dispatch(setUserState(response.data));
        })
  }

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
            if(response.status == 200){
                setAxiosHeaderAuthorization(response.data)
                setIsLoggedIn(true)
            }
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
            response.data && navigate("/login");
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
            {!isLoginPage && <Input onChange={onChangeInput} placeholder="first name" name="firstName"/>}
            {!isLoginPage && <Input onChange={onChangeInput} placeholder="last name" name="lastName"/>}
            <Input onChange={onChangeInput} placeholder="email" name="username"/>
            <Input onChange={onChangeInput} placeholder="password" name="password" type="password"/>
            {isLoginPage ? <Button text="Login" onClick={onLoginClick}/> :
                                            <Button text="Register" onClick={onRegisterClick}/>}
        </SigningBox>
        {isModalShowing && <Modal body={<ConfirmTokenModal {...modalParams}/>}/>}
    </SigningFormWrapper>
  )
}
