import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import styled from 'styled-components';

const SkeletonWrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 10%);
  margin-bottom: 1.5rem;
  padding: 1rem;
`;

const SkeletonContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SkeletonUser = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const SkeletonUserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const SkeletonInfo = styled.div`
  margin-top: 1rem;
`;

const SkeletonTags = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const StyledSkeleton = styled(Skeleton)`
  &.MuiSkeleton-rectangular {
    border-radius: 0;
  }
`;

export const PostSkeleton = () => {
  return (
    <SkeletonWrapper>
      <Stack spacing={1}>
        <StyledSkeleton variant="rectangular" width="100%" height={300} />
        <SkeletonContent>
          <SkeletonUser>
            <StyledSkeleton
              variant="circular"
              width={40}
              height={40}
              style={{ marginRight: 10 }}
            />
            <SkeletonUserDetails>
              <StyledSkeleton variant="text" width={60} height={20} />
              <StyledSkeleton variant="text" width={100} height={15} />
            </SkeletonUserDetails>
          </SkeletonUser>
          <SkeletonInfo>
            <StyledSkeleton variant="text" width="80%" height={45} />
            <SkeletonTags>
              <StyledSkeleton variant="text" width={40} height={30} />
              <StyledSkeleton variant="text" width={40} height={30} />
              <StyledSkeleton variant="text" width={40} height={30} />
            </SkeletonTags>
          </SkeletonInfo>
        </SkeletonContent>
      </Stack>
    </SkeletonWrapper>
  );
};