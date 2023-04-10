import React from 'react';
import styled from 'styled-components';

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
`;

const Additional = styled.span`
  font-size: 0.8rem;
  color: gray;
`;

const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <UserInfoWrapper>
      <Avatar src={avatarUrl || '/noavatar.png'} alt={fullName} />
      <UserDetails>
        <UserName>{fullName}</UserName>
        <Additional>{additionalText}</Additional>
      </UserDetails>
    </UserInfoWrapper>
  );
};

export default UserInfo