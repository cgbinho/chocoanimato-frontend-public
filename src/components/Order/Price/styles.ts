import styled from 'styled-components';

interface IPriceProps {
  justify: string; // 'center', 'end'
}

export const Container = styled.div`
  display: flex;
  justify-content: end;
`;

export const PriceContainer = styled.div<IPriceProps>`
  display: flex;
  justify-content: ${props => props.justify};
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
