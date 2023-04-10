import TopBar from "./TopBar";
import styled from "styled-components";

const MainLayout = ({ children }) => {
  return (
    <>
      <TopBar/>
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default MainLayout;

const Wrapper = styled.div`
  padding: 100px 80px;
`;
