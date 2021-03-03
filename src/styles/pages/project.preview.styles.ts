import styled, { css } from 'styled-components';
import { Shadow } from '../partials';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-self: center;
  align-self: flex-start;

  margin: 2rem;
  /* padding: 1.5rem 0; */

  min-width: 350px;

  ${Shadow};
  hr {
    border: 0;
    border-top: 1px solid var(--light_gray);
    margin: 0.5rem 0;
  }
`;

export const Content = styled.div`
  p {
    margin-bottom: 4px;
  }
`;

export const HeaderContainer = styled.div`
  padding: 1rem 1rem;

  p {
    text-align: center;
  }
`;

export const InfoContainer = styled.div`
  padding: 0.5rem 1.5rem 1.5rem;

  p {
    margin-top: 0.2rem;
    line-height: 1.4;
  }
`;

export const VideoContainer = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
`;

export const VideoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--secondary);

  p {
    color: white;
  }
`;
