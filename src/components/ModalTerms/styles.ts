import styled, { keyframes } from 'styled-components';
import Modal from 'styled-react-modal';
import { Shadow } from '../../styles/partials';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Container = styled.div`
  a {
    font-size: 14px;
    cursor: pointer;
    text-align: center;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem;
  min-width: 350px;
  max-width: 600px;
  ${Shadow};
  animation: 0.4s ${fadeIn} ease-out;

  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }

  a {
    cursor: pointer;
    text-align: right;
    /* color: var(--primary); */
  }
`;

export const StyledModal = styled(Modal)`
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;
