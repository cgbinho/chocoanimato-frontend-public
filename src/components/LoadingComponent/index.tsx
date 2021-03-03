import React from 'react';
import { LoadingContainer, SpinnerContainer } from './styles';

const Loading = ({ message }) => {
  return (
    <LoadingContainer>
      <SpinnerContainer />
      <p>{message}</p>
    </LoadingContainer>
  );
};
export default Loading;
