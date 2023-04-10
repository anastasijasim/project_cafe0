import { fetchAuthRegister, selectIsAuth } from '../../redux/slices/auth';
import {useDispatch, useSelector} from "react-redux"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {Navigate} from "react-router-dom";
import Paper from '@mui/material/Paper';
import React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import {useForm} from "react-hook-form"

const Register = () => {

  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register, 
    handleSubmit, 
    formState:{errors, isValid} 
  } = useForm({
    defaultValues:{
      fullname: "Anastasija S",
      email:'meow1111@gmail.com',
      password: "12345"
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) =>{
    const data = await dispatch(fetchAuthRegister(values));
    
    if(!data.payload) {
      return alert ("'Failed to log out!'")
    }
    if ('token' in data.payload) {
      window.localStorage.setItem ("token", data.payload.token);
    }
  };

  if(isAuth){
    return <Navigate to ="/"/>;
  }

  return (
    <StyledPaper>
      <Title variant="h5">Creating an account</Title>
      <AvatarWrapper>
        <StyledAvatar />
      </AvatarWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field 
          label="FullName" 
          error = {Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', {required:'Укажите полное имя'})}
          fullWidth 
        />
        <Field 
          label="E-Mail" 
          type="email"
          error = {Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', {required:'Укажите почту'})}
          fullWidth 
        />
        <Field 
          label="Password" 
          type ="password"
          helperText={errors.password?.message}
          error = {Boolean(errors.password?.message)}
          {...register('password', {required:'Укажите пароль'})}
          fullWidth />
        <StyledButton disabled={!isValid} type="submit" size='large' variant="contained" fullWidth>
          Sign up
        </StyledButton>
      </form>
    </StyledPaper>
  );
};

export default Register;


const StyledPaper = styled(Paper)`
  padding: 30px;
`;

const Title = styled(Typography)`
  && {
    margin-bottom: 30px;
    text-align: center;
  }
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const StyledAvatar = styled(Avatar)`
  && {
    width: 100px;
    height: 100px;
  }
`;

const Field = styled(TextField)`
  && {
    margin-bottom: 20px;
  }
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 20px;
  }
`;