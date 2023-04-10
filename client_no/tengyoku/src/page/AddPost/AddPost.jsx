import {Navigate, useNavigate, useParams} from "react-router-dom"
import React, { useEffect, useRef } from 'react';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import SimpleMDE from 'react-simplemde-editor';
import TextField from '@mui/material/TextField';
import axiosInstance from '../../axios';
import { selectIsAuth } from '../../redux/slices/auth';
import styled from 'styled-components';
import { useCallback } from 'react';
import { useMemo } from 'react';
import {useSelector} from "react-redux";
import { useState } from 'react';

const AddPost = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading,setIsLoading] = useState(false)
  const inputFileRef = useRef(null);
  const isEditing = Boolean(id);


  const handleChangeFile = async (event) => {
    try{
      const formData = new FormData();
      const file= event.target.files[0];
      formData.append('image',file);
      const {data} = await axiosInstance.post("/upload",formData);
      setImageUrl(data.url)
      console.log (data)
    }catch(err){
      console.warn (err);
      alert("Error")
    }
  };

  const onClickRemoveImage = ()=>{
    setImageUrl('');
  };

  const onChange = useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () =>{
    try{
      setIsLoading (true);
      const fields = {
        title,
        imageUrl,
        text,
      }
      const { data } = isEditing
      ? await axiosInstance.patch(`/posts/${id}`, fields) 
      : await axiosInstance.post('/posts', fields);
    const _id = isEditing ? id : data._id;
    
    navigate(`/posts/${_id}`);
    }catch(err) {
      console.warn(err);
      alert("Error")
    }
  }

  useEffect(()=>{
    if(id) {
      axiosInstance.get(`/posts/${id}`)
      .then(({data}) =>{
        setTitle(data.title);
        setText(data.text);
        setImageUrl(data.url);
      }).catch(err => {
        console.warn (err);
        alert("error");
      })
    }
  }, [])

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Write text...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if(!isAuth){
    return <Navigate to="/"/>
  }

  //if(!window.localstorage.getItem("token")&&!isAuth){
  //   return <Navigate to ="/"/>
  // }

  console.log ({title,text})

  return (
    <Container>
      <Button onClick={()=> inputFileRef.current.click() } variant="outlined" size="large">
        Download previews 
      </Button>
      <input 
        ref={inputFileRef} 
        type="file" 
        onChange={handleChangeFile}  
        hidden 
      />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" 
            onClick={onClickRemoveImage}>
              Delete
            </Button>
            <Image src={`http://localhost:8080${imageUrl}`} alt="Uploaded" />
          </>
      )}
      <br/>
      <br/>
      <TitleField 
        variant="standard" 
        placeholder='Article Title' 
        text={title}
        onChange={e=>setTitle(e.target.text)}
        fullWidth 
      />
  
      <EditorWrapper>
        <SimpleMDE 
        text={text} 
        onChange={onChange} 
        options={options} 
        />
      </EditorWrapper>
      <ButtonsWrapper>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing? "Save": "Public"}
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </ButtonsWrapper>
    </Container>
  );
};

export default AddPost;


const Container = styled(Paper)`
  padding: 30px;
  height:300px
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Image = styled.img`
  max-height: 200px;
  margin-left: 10px;
`;

const TitleField = styled(TextField)`
  && {
    margin-bottom: 10px;
  }
`;

const EditorWrapper = styled.div`
  && {
    .editor-toolbar {
      border: none;
      border-radius: 0;
      background-color: #fafafa;
      box-shadow: none;
    }
    .CodeMirror {
      border: none;
      border-radius: 0;
      box-shadow: none;
    }
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  
`;