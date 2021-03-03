import styled from 'styled-components';
// import { shade, cssVar } from 'polished';

export const Background = styled.div`
  background: url('./images/home_background.svg') no-repeat center;
  background-size: cover;
`;

export const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  /* grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); */
  margin: 2rem;
  grid-gap: 2rem;
  align-content: center;

  img {
    width: 400px;
  }

  @media screen and (max-width: 800px) {
    grid-auto-flow: row;
    justify-content: center;
    align-items: center;

    img {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  text-align: end;

  @media screen and (max-width: 800px) {
    grid-auto-flow: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    order: 2;

    img {
      align-content: center;
    }
  }
`;
