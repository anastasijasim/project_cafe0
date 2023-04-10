import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';
import {useDispatch, useSelector} from "react-redux"

import Button from '@mui/material/Button';
import {Navigate} from "react-router-dom"
import Paper from '@mui/material/Paper';
import React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import {useForm} from "react-hook-form"

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register, 
    handleSubmit, 
    formState:{errors, isValid} 
  } = useForm({
    defaultValues:{
      email:"",
      password: ""
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) =>{
    const data = await dispatch(fetchAuth(values));
    
    if(!data.payload) {
      return alert ("'Failed to log in!'")
    }
    if ('token' in data.payload) {
      window.localStorage.setItem ("token", data.payload.token);
    }
  };

  if(isAuth){
    return <Navigate to ="/"/>;
  }


  console.log( "isAuth", isAuth)
  return (
    <LoginWrapper>
      <Title variant="h5">Log in</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field 
          label="E-Mail" 
          type="email"
          error = {Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', {required:'Specify mail'})}
          fullWidth 
        />
        <Field 
          type="password"
          label="password" 
          helperText={errors.password?.message}
          error = {Boolean(errors.password?.message)}
          {...register('password', {required:'Enter your password'})}
          fullWidth />
        <LoginButton disabled={!isValid} type="submit" size='large' variant="contained" fullWidth>
          Log in 
        </LoginButton>
      </form>
    </LoginWrapper>
  );
};

export default Login

const LoginWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

const Title = styled(Typography)`
  margin-bottom: 30px;
`;

const Field = styled(TextField)`
  margin-bottom: 20px;
`;

const LoginButton = styled(Button)`
  margin-top: 20px;
`;