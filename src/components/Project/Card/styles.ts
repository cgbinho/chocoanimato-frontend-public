import styled from 'styled-components';

export const InfoContainer = styled.div`
  padding: 0.5rem 1.5rem 1.5rem;
  text-align: left;

  p {
    margin-top: 0.2rem;
    line-height: 1.4;
  }
`;

export const EditContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 8px;

  a {
    cursor: pointer;
    justify-content: center;
    align-self: center;
    padding-right: 16px;
    color: var(--secondary);
  }

  button {
    margin-top: 0;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;

  max-width: 330px;
  overflow: hidden;

  background: white;
  border-radius: 0.5rem;
  border: 1px solid #ebebeb;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.08);
  border-radius: 14px;
`;

export const VideoContainer = styled.div`
  img {
    width: 100%;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  align-items: center;

  del {
    font-size: 1.2rem;
    font-weight: 400;
    margin-right: 0.5rem;
  }

  span:last-child {
    font-size: 1.5rem;
    color: tomato;
  }
`;
