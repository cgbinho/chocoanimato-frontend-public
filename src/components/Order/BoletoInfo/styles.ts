import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  flex-direction: column;

  align-items: center;
  padding-top: 1rem;
  /* align-self: flex-start; */
  > span {
    text-decoration: underline;
    /* overflow: hidden; */
    word-break: break-all;
    text-overflow: ellipsis;
    border-radius: 8px;
    padding: 1rem 0.5rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  margin: 0 8px;
  /* grid-auto-flow: row; */
  /* grid-gap: 2rem; */
  /* padding-bottom: 1rem; */

  .boletoImage {
    object-fit: contain;
    border: 2px solid var(--secondary);
    border-radius: 8px;
    overflow: hidden;
    &:hover {
      border: 2px solid var(--secondary_dark);
    }
  }
`;

export const BarcodeContainer = styled.div`
  display: flex;
  flex-direction: column;

  section {
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    /* justify-content: center; */

    a {
      cursor: pointer;
      display: flex;
      flex-direction: row;
    }

    aside {
      text-align: center;
      align-self: center;
      justify-self: center;
      background-color: var(--secondary);
      color: white;
      padding: 0.5rem;
      border-radius: 8px;
      box-shadow: 3px 3px 3px rgba(176, 86, 26, 0.2);

      &:hover {
        background-color: #fb5f04;
      }

      &:active {
        transform: translateY(1px);
        transition: all 0.2s ease 0s;
      }
    }

    span {
      font-size: small;
    }

    p {
      width: 100%;
      background-color: var(--secondary_light);
      border-radius: 4px;
      margin: 1rem;
      padding: 0.5rem;
      font-size: 0.9rem;
      /* background: var(--secondary_light); */
    }
  }
`;
