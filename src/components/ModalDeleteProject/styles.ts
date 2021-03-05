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

export const Container = styled.div`
  a {
    font-size: 14px;
    cursor: pointer;
    /* text-align: center; */
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

  h2,
  h3 {
    /* text-align: center; */
    margin-bottom: 1rem;
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

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  /* padding: 2rem; */
`;
