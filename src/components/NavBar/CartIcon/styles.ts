import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: relative;

  a {
    cursor: pointer;
  }

  span {
    position: absolute;
    top: -6px;
    right: -6px;
    padding: 1px 5px;
    color: white;
    border-radius: 50%;
    background: var(--secondary);
    font-size: 0.7rem;
  }
`;
