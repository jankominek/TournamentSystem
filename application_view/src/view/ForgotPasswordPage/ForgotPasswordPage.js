import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Modal } from '../../components/Modal/Modal';
import { ResetPasswordModal } from '../../utils/ResetPasswordModal/ResetPasswordModal';
import { ForgotPasswordForm, ForgotPasswordPageWrapper } from './ForgotPasswordPage.styled'
import { toast } from 'react-toastify';

export const ForgotPasswordPage = () => {

    const [email, setEmail] = useState("");
    const [isModalShowing, setIsModalShowing] = useState(false);

    const navigate = useNavigate();

    const onChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
    }

    const onResetClick = () => {
        console.log("email : ", email)
       email && axios.post(`http://localhost:8079/forgot/${email}`)
            .then( (response) => {
                console.log("response : ", response.data)
                setIsModalShowing(true);

            })
            .catch( err => {
                console.log(err.response.data.message);
            })
    }

    const onModalSave = (data) => {
        console.log("DATA : ", data)
        axios.post(`http://localhost:8079/reset/${data.username}/${data.token}/${data.password}`)
            .then( (response) => {
                toast.success(response.data.message);
                setIsModalShowing(false);
                navigate("/login");
            })
            .catch( err => {
                console.log(err.response.data.message);
            })
    }
    const onModalClose = () => {
        setIsModalShowing(false);
    }

    const modalParams = {
        onModalSave : onModalSave,
        onModalClose : onModalClose,
        saveButtonTitle : "reset",
        closeButtonTitle : "close"
    }

  return (
      <>
    <ForgotPasswordPageWrapper>
        <ForgotPasswordForm>
            <Input onChange={onChangeEmail} placeholder="email" />
            <Button text="reset" onClick={onResetClick}/>
        </ForgotPasswordForm>
    </ForgotPasswordPageWrapper>
    {isModalShowing && <Modal body={<ResetPasswordModal {...modalParams}/>}/>}
    </>
  )
}
