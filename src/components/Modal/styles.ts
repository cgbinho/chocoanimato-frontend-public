import styled, { css } from 'styled-components';
import { Shadow } from '../../styles/partials';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-self: center;
  align-self: flex-start;

  margin: 2rem;
  padding: 2rem;

  min-width: 350px;

  ${Shadow};
`;
