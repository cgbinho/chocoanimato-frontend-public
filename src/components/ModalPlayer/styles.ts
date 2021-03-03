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
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 8px;
  margin: 2rem;
  min-width: 350px;
  width: 80%;
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
    margin-bottom: 10px;
    /* margin-right: 20px; */
  }

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    padding: 2rem 0;
    border-radius: 8px;
    margin: 0rem;
    width: 100%;
    border-radius: 0;
    /* min-width: 350px; */
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

export const VideoContainer = styled.div`
  position: relative;
  /* padding-top: 56.25%; */

  /* .react-player {
    position: absolute;
    top: 0;
    left: 0;
  } */
`;
