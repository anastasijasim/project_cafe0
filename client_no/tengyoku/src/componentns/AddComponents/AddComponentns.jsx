import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import React from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarWrapper = styled(Avatar)`
  && {
    margin-right: 10px;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 10px;
  }
`;

const AddComment = () => {
  return (
    <Root>
      <AvatarWrapper
        src="https://mui.com/static/images/avatar/5.jpg"
      />
      <Form>
        <StyledTextField
          label="Write comment"
          variant="outlined"
          maxRows={10}
          multiline
          fullWidth
        />
        <Button variant="contained">Send</Button>
      </Form>
    </Root>
  );
};

export default AddComment;