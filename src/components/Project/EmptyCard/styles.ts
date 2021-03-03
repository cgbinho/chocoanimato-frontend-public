import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: space-between;

  max-width: 330px;
  /* min-height: 330px; */
  overflow: hidden;
  padding: 1.5rem;

  background: white;
  border-radius: 0.5rem;
  border: 1px solid #ebebeb;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.08);
  border-radius: 14px;

  a {
    align-self: end;
    margin: 8px;
    color: var(--secondary);
  }
`;

export const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  align-items: center;
`;
