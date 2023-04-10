import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import SideBlock from '../SideBlock/SideBlock';
import Skeleton from '@mui/material/Skeleton';
import styled from 'styled-components';

const CommentListItem = styled(ListItem)`
  display: flex;
  align-items: flex-start;
`;

const CommentAvatar = styled(ListItemAvatar)`
  min-width: 40px;
`;

const CommentListItemText = styled(ListItemText)`
  display: flex;
  flex-direction: column;
`;

const CommentPrimaryText = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

const CommentSecondaryText = styled.span`
  font-size: 0.875rem;
  color: #6b6b6b;
`;

const CommentsDivider = styled(Divider)`
  margin-top: 8px;
  margin-bottom: 8px;
`;

const CommentsList = styled(List)`
  padding: 0;
`;

const CommentsBlockRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const CommentsBlockTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 1.25rem;
  font-weight: bold;
`;

const CommentsBlock = ({ items, children, isLoading = true }) => {
  return (
    <CommentsBlockRoot>
      <CommentsBlockTitle>Comments</CommentsBlockTitle>
      <SideBlock>
        <CommentsList>
          {(isLoading ? [...Array(5)] : items).map((obj, index) => (
            <React.Fragment key={index}>
              <CommentListItem alignItems="flex-start">
                <CommentAvatar>
                  {isLoading ? (
                    <Skeleton variant="circular" width={40} height={40} />
                  ) : (
                    <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                  )}
                </CommentAvatar>
                {isLoading ? (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Skeleton variant="text" height={25} width={120} />
                    <Skeleton variant="text" height={18} width={230} />
                  </div>
                ) : (
                  <CommentListItemText
                    primary={
                      <CommentPrimaryText>{obj.user.fullName}</CommentPrimaryText>
                    }
                    secondary={
                      <CommentSecondaryText>{obj.text}</CommentSecondaryText>
                    }
                  />
                )}
              </CommentListItem>
              <CommentsDivider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </CommentsList>
        {children}
      </SideBlock>
    </CommentsBlockRoot>
  );
};

export default CommentsBlock