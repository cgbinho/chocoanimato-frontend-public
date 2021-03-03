import styled from 'styled-components';
import { shade, cssVar } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-self: center;
  align-items: center;
  padding: 2rem;
  /* align-self: flex-start; */
`;

export const Content = styled.div`
  display: grid;
  grid-gap: 0.2rem;

  justify-items: center;
  align-self: flex-start;

  margin-top: 40px;
  margin-bottom: 10px;

  padding: 2rem;
  max-width: 560px;

  background: white;
  border-radius: 0.5rem;
  border: 1px solid #ebebeb;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.08);
  border-radius: 14px;

  > span {
    text-decoration: underline;
    /* overflow: hidden; */
    word-break: break-all;
    text-overflow: ellipsis;
    border-radius: 8px;
    padding: 1rem 0.5rem;
  }

  p {
    margin-top: 0.5rem;
    text-align: center;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  color: var(--secondary);
  justify-content: center;
  margin-bottom: 1rem;
`;
