import styled, { css, keyframes } from 'styled-components';
import { Shadow } from '../../styles/partials';
import Modal from 'styled-react-modal';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px;
  border-radius: 8px;
  ${Shadow};
  animation: 0.4s ${fadeIn} ease-out;
  cursor: pointer;
  /* a { */
  /* font-size: 14px; */
  /* cursor: pointer; */
  /* text-align: center; */
  /* } */
  a {
    cursor: pointer;
    text-align: right;
    margin-bottom: 10px;
    margin-right: 0;
  }
  h2,
  h3 {
    margin-bottom: 1rem;
  }
`;

export const StyledModal = styled(Modal)`
  /* width: 20rem; */
  /* height: 20rem; */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;
