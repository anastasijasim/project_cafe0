import Paper from "@mui/material/Paper";
import React from "react";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

const Root = styled(Paper)`
  && {
    padding: 16px;
    margin-bottom: 16px;
  }
`;

const Title = styled(Typography)`
  && {
    margin-bottom: 16px;
  }
`;

const SideBlock = ({ title, children }) => {
  return (
    <Root>
      <Title variant="h6">{title}</Title>
      {children}
    </Root>
  );
};

export default SideBlock;