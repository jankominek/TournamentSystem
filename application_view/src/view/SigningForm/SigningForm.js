import React, { useEffect, useState } from 'react'
import { Button } from '../../components/Button/Button'
import { Input } from '../../components/Input/Input'
import { Flex, SigningBox, SigningFormWrapper, SigningModalWrapper, SigningOption } from './SigningForm.styled'
import axios from 'axios';
import { Modal } from '../../components/Modal/Modal';
import { ConfirmTokenModal } from '../../utils/ConfirmTokenModal';
import { useDispatch, useSelector } from 'react-redux';
import { setUserState } from '../../redux/User';
import { Navigate, useNavigate } from 'react-router-dom';
import { setAxiosHeaderAuthorization } from '../../utils/axiosConfiguration';
import { setTournaments } from '../../redux/Tournaments';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const SigningForm = (props) => {

  const {isLoginPage} = props;

  const [userCredentials, setUserCredentials] = useState({});
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const userState = useSelector( state => state.user);
  const dispatch = useDispatch();

  useEffect( () => {
    if(isLoginPage){
      // reload();
    }
  }, [])

  const reload = () => {
    window.location.reload(true);
  }

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

    const onLoginClick = () => {
      axios.post("http://localhost:8079/login", userCredentials)
        .then( (response) => {
            if(response.status == 200){
                toast.success("Logged in successfully");
                setAxiosHeaderAuthorization(response.data)
                setIsLoggedIn(true)
            }
        })
        .catch( error => {
          toast.error(error.code);
        })
    }

    const onRegisterClick = () => {
        axios.post("http://localhost:8079/register", userCredentials)
          .then( (response) => {
              response.data && setIsModalShowing(true);
              toast.success("Register successfully")
          })
          .catch( err => {
              toast.error(err.response.data.message);
          })
    }

    const onModalClose = () => {
      setIsModalShowing(false);
    }

    const onModalSave = (data) => {
      axios.post("http://localhost:8079/register/confirm", data)
        .then( (response) => {
            response.data && navigate("/login");
            toast.success("Email confirmation successfully")
            reload();
        })
    }

    const modalParams = {
        onModalSave : onModalSave,
        onModalClose : onModalClose,
        saveButtonTitle : "Save",
        closeButtonTitle : "Close"
    }

    const onForgotPassword = () => {
        navigate("/forgot");
    }

    const onConfirmEmail = () => {
      setIsModalShowing(true);
    }
  return (
    <>
    <SigningFormWrapper>
        <SigningBox>
            {!isLoginPage && <Input onChange={onChangeInput} placeholder="first name" name="firstName"/>}
            {!isLoginPage && <Input onChange={onChangeInput} placeholder="last name" name="lastName" />}
            <Input onChange={onChangeInput} placeholder="email" name="username" />
            <Input onChange={onChangeInput} placeholder="password" name="password" type="password"/>
            {isLoginPage ? <Button text="Login" onClick={onLoginClick}/> :
                                            <Button text="Register" onClick={onRegisterClick}/>}
          {isLoginPage && <SigningOption onClick={onForgotPassword}>forgot password</SigningOption>} 
          {!isLoginPage && <SigningOption onClick={onConfirmEmail}>confirm e-mail</SigningOption>} 
                                        
        </SigningBox>
      
        {isModalShowing && <Modal body={<ConfirmTokenModal {...modalParams}/>}/>}
    </SigningFormWrapper>
    
    </>
  )
}
