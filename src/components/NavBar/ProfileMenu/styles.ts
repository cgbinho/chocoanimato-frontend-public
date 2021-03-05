import styled, { css, keyframes } from 'styled-components';
import { Shadow } from '../../../styles/partials';
import Button from '../../Form/Button';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu
} from 'styled-dropdown-component';

export const DropdownContainer = styled(Dropdown)``;

export const DropdownMenuContainer = styled(DropdownMenu)`
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #ebebeb;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.08);
  /* border-radius: 14px; */
  margin-top: 16px;
  right: -32px;
  text-align: left;

  hr {
    border: 0;
    border-top: 1px solid var(--light_gray);
    margin: 0.5rem 0;
  }
`;

export const DropdownItemContainer = styled(DropdownItem)`
  font-size: 1rem;
  cursor: pointer;
  color: var(--primary);
  margin: 1rem;

  a {
    display: flex;
    align-items: center;
  }

  svg {
    margin-right: 12px;
  }

  &:hover,
  &:focus {
    color: var(--secondary_dark);
    text-decoration: none;
    background-color: transparent;
  }
`;

export const ProfileButton = styled(Button)`
  margin: 0;
  padding: 16px 16px;
`;
