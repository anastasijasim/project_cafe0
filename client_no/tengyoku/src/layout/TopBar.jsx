import { LOGIN_PATH, REGISTER_PATH } from '../routes/consts';
import { logout, selectIsAuth } from '../redux/slices/auth';
import {useDispatch, useSelector} from "react-redux"

import Button from '@mui/material/Button';
import {Link} from "react-router-dom"
import React from 'react';
import styled from 'styled-components';

const TopBar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector (selectIsAuth)
  

  const onClickLogout = () => {
    if(window.confirm("Are you sure you want to logout?")){
    dispatch(logout());
    // window.localStorage.removeItem("token")
    }
  };

  return (
    <HeaderWrapper>
      <Container maxWidth="lg">
        <InnerWrapper>
          <Logo href="/">TENGYOKU</Logo>
          <ButtonsWrapper>
            {isAuth ? (
              <>
                <StyledLink to={"/add-posts"}>
                  <StyledButton variant="contained">Write a post</StyledButton>
                </StyledLink>
                <StyledButton onClick={onClickLogout} variant="contained" color="error">
                  Sign out
                </StyledButton>
              </>
            ) : (
              <>
                <LoginLink to={LOGIN_PATH}>
                  <StyledButton variant="outlined">Log in</StyledButton>
                </LoginLink>
                <RegisterLink to={REGISTER_PATH}>
                  <StyledButton variant="contained">Create account</StyledButton>
                </RegisterLink>
              </>
            )}
          </ButtonsWrapper>
        </InnerWrapper>
      </Container>
    </HeaderWrapper>
  );
};

export default TopBar;


const StyledLink = styled(Link)`
    
`

const HeaderWrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 10%);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
`;

const InnerWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 4.5rem;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  margin-left: 1rem;
`;

const Container = styled.div`
    
`

const LoginLink = styled(Link)`
    
`

const RegisterLink = styled(Link)`
    
`