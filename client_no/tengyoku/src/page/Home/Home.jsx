/* eslint-disable no-unused-vars */

import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux"

import Grid from '@mui/material/Grid';
import Post from '../../componentns/Posts/Posts';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { fetchPosts } from '../../redux/slices/posts';
import styled from 'styled-components';

// import axiosInstance from '../../axios';



const Home = () => {
  const dispatch = useDispatch();
  const {posts} = useSelector (state => state.posts);
  const isPostsLoading = posts.status === "loading";
  const userData = useSelector((state)=> state.auth.data)

  useEffect(()=>{
    dispatch(fetchPosts())
  }, [dispatch]);

  console.log (posts);
  return (
    <Wrapper>
      <StyledTabs value={0} aria-label="basic tabs example">
        <Tab label="New" />
        <Tab label="Popular" />
      </StyledTabs>
      <StyledGrid container spacing={4}>
        <StyledGrid xs={8} item>
          {(isPostsLoading?[...Array(5)]:posts.items).map((obj, index) => 
          isPostsLoading? (
          <Post key={index} isLoading={true}/>
          ):(
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl?`http://localhost:8080${obj.imageUrl}`: ""}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                isEditable = {userData?._id===obj.user._id}
              />
          ))}
        </StyledGrid>
        <StyledGrid xs={4} item>
          
        </StyledGrid>
      </StyledGrid>
    </Wrapper>
  );
};

export default Home


const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 15px;
`;

const StyledTabs = styled(Tabs)`
  margin-bottom: 15px;
`;

const StyledGrid = styled(Grid)`
  margin-top: 20px;
`;

// const PostWrapper = styled.div`
//   margin-bottom: 30px;
// `;