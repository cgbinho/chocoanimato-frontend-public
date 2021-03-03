import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-self: center;
  align-self: flex-start;

  hr {
    border: 0;
    border-top: 1px solid var(--light_gray);
    margin: 0.5rem 0;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  max-width: 700px;
  min-width: 350px;

  @media (max-width: 800px) {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`;
export const UserDataContainer = styled.div`
  section:not(:first-child) {
    margin-top: 16px;
  }

  p {
    font-size: 14px;
    line-height: 1.4;
  }

  section {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  h3 {
    margin-right: 8px;
  }

  svg {
    color: var(--secondary);
  }
`;

export const OrderDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .footer {
    margin-top: auto;
  }
`;
