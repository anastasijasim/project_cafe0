import styled, { css } from 'styled-components';

import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import IconButton from '@mui/material/IconButton';
import {Link} from "react-router-dom";
import { PostSkeleton } from './PostsSkeleton';
import React from 'react';
import UserInfo from '../UserInfo/UserInfo';
import { fetchRemovePost } from '../../redux/slices/posts';
import {useDispatch} from "react-redux";

// import { FULLPOST_PATH } from '../../routes/consts';






const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <PostSkeleton/>
  }
  const onClickRemove = () => {
    if(window.confirm("Do you want to delete this post?")){
      dispatch(fetchRemovePost(id));
    }
  };
  return (
    <PostWrapper isFullPost={isFullPost}>
      {isEditable && (
        <EditButtonsWrapper>
          <StyledEditPost to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </StyledEditPost>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </EditButtonsWrapper>
      )}
      {imageUrl && <PostImage src={imageUrl} alt={title} isFullPost={isFullPost} />}
      <PostWrapperInner>
        <UserInfoWrapper>
          <UserInfo fullName={''} {...user} additionalText={createdAt} />
        </UserInfoWrapper>
        <PostDetailsWrapper>
          <PostTitle isFullPost={isFullPost}>
            {isFullPost ? title : <StyledFullPost to={`/posts/${id}`}>{title}</StyledFullPost>}
          </PostTitle>
          {children && <PostContent>{children}</PostContent>}
          <PostDetailsList>
            <PostDetailsItem>
              <EyeIcon />
              <span>{viewsCount}</span>
            </PostDetailsItem>
            <PostDetailsItem>
              <CommentIcon />
              <span>{commentsCount}</span>
            </PostDetailsItem>
          </PostDetailsList>
        </PostDetailsWrapper>
      </PostWrapperInner>
    </PostWrapper>
  );
};

export default Post


 const StyledEditPost = styled(Link)`
  
 `

const StyledFullPost = styled (Link)`
  
`

const PostWrapper = styled.div`
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  ${({ isFullPost }) =>
    isFullPost &&
    `
    padding: 32px;
    display: flex;
    flex-direction: column;
  `}
`;

const EditButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;


const PostImage = styled.img`
  display: block;
  margin: 16px;
`

const PostWrapperInner = styled.div`
    display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 16px;
`
const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;


const PostDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;


const PostTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: ${({ isFullPost }) => (isFullPost ? '16px' : '8px')};
  ${({ isFullPost }) =>
    !isFullPost &&
    css`
      a {
        text-decoration: none;
        color: #212121;
        &:hover {
          text-decoration: underline;
        }
      }
    `}
`;

const PostContent = styled.div`
  margin-bottom: 16px;
`;

const PostDetailsList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  li {
    display: flex;
    align-items: center;
    margin-right: 16px;
    svg {
      margin-right: 4px;
      font-size: 16px;
      color: #757575;
    }
    span {
      font-size: 14px;
      color: #757575;
    }
  }
`;

const PostDetailsItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #757575;

  & > svg {
    margin-right: 5px;
    font-size: 18px;
    color: #9e9e9e;
  }
`;



