import styled from 'styled-components';
import { shade, cssVar } from 'polished';
import Button from '../../components/Form/Button';

export const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  grid-gap: 1rem;
  align-items: center;
  padding: 0 2rem;
`;

export const NavContainer = styled.ul`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 2.5rem;
  align-items: center;
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #ebebeb;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.08);

  button {
    margin: 0;
    padding: 16px 28px;
  }

  @media (max-width: 920px) {
    display: none;
  }

  /* .profile {
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 12px;
      transition: all 0.3s ease 0s;

      &:hover {
        svg {
          fill: var(--secondary_dark);
        }
      }

      svg {
        margin-right: 8px;
        fill: var(--secondary);
      }
    }
  } */
`;

// export const RegisterButton = styled(Button)`
//   margin: 0;
//   padding: 16px 28px;
// `;

export const BurguerContainer = styled.ul`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-gap: 1rem;

  @media (min-width: 921px) {
    display: none;
  }
`;
