import { useEffect, useState } from "react";

import AddComment from "../../componentns/AddComponents/AddComponentns";
import CommentsBlock from "../../componentns/CommentsBlock/CommentsBlock";
import Post from "../../componentns/Posts/Posts";
import axiosInstance from "../../axios";
import styled from "styled-components";
import {useParams} from "react-router-dom"

const FullPostContainer = styled.div`
  /* styles for the container */
`;

const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const {id} = useParams();
 
  useEffect(()=>{
    axiosInstance.get(`/posts/${id}`)
    .then(res => {
      setData(res.data);
      setLoading(false)
    }).catch ((err)=>{
      console.warn(err);
      alert('Error')
    });
  },[id])

  if(isLoading){
    return <Post isLoading={isLoading} isFullPost/>
  }
  
  return (
    <FullPostContainer>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:8080${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        isFullPost
      >
        <p>
          {data.text}
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Ana",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Comment",
          },
          {
            user: {
              fullName: "Ivan",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <AddComment />
      </CommentsBlock>
    </FullPostContainer>
  );
};

export default FullPost;