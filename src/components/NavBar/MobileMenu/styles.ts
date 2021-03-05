import styled from 'styled-components';
import { Shadow } from '../../../styles/partials';

import Button from '../../Form/Button';

export const StyledMenu = styled.nav<{ open: boolean }>`
  top: 0;
  right: 0;
  height: 100vh;
  width: 35vw;
  position: fixed;
  background-color: white;
  z-index: 1;

  display: flex;
  flex-direction: column;
  padding: 10rem 0;

  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};

  ${Shadow};
  border-radius: 0;

  .logged_indicator {
    margin-bottom: 1rem;
    padding: 1rem 4rem;

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;

      p {
        margin-left: 8px;
      }
    }

    svg {
      /* color: var(--secondary_dark); */
      flex-grow: 1;
      flex-shrink: 1;
      /* flex-basis: 20em; */
    }
  }

  hr {
    border: 0;
    border-top: 1px solid var(--light_gray);
    margin-bottom: 1rem;
  }

  @media (max-width: 600px) {
    width: 100%;
    text-align: center;
  }
`;

export const StyledLink = styled.a`
  padding: 0 3rem;
  font-size: 1.5rem;
  color: var(--primary);
  text-decoration: none;
  margin-bottom: 1.5rem;

  &:hover {
    color: var(--secondary_dark);
  }
`;

export const StyledButton = styled(Button)`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  min-width: 14vw;
  padding: 1.2rem;
`;
