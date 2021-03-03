import styled from 'styled-components';
import { css } from 'styled-components';

interface IProps {
  opacity: number | string;
}
export const ModalBackground = styled.div<IProps>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 30;
  opacity: 20%;
  background-color: var(--primary);
`;

export const Shadow = css`
  background: white;
  border-radius: 0.5rem;
  border: 1px solid #ebebeb;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.08);
`;

export const Stroke = css`
  text-shadow: -1px -1px 0 var(--primary_dark), 1px -1px 0 var(--primary_dark),
    -1px 1px 0 var(--primary_dark), 1px 1px 0 var(--primary_dark);
`;
