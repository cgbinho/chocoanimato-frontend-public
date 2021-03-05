import styled, { keyframes } from 'styled-components';
import { shade, cssVar } from 'polished';

interface IContainerProps {
  width: string;
  primary?: boolean;
}

export const Container = styled.button<IContainerProps>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 14px;
  padding: 0.5rem 1.5rem;

  font-size: 14px;
  height: 50px;

  width: ${props => props.width};
  color: ${props => (props.primary ? 'white' : `#FC8139`)};
  background: ${props => (props.primary ? `#FC8139` : `#FFF1E9`)};

  /* color: white; */
  border: none;
  /* background: var(--secondary); */
  border-radius: 0.4rem;
  box-shadow: 3px 3px 3px rgba(176, 86, 26, 0.2);
  transition: background-color 0.2s;

  svg {
    /* fill: ${props => (props.primary ? 'white' : `#FC8139`)}; */
  }

  > span {
    margin-left: 4px;
    text-decoration: none;
  }

  &:hover {
    background: ${props => (props.primary ? `#fb5f04` : `#ffdfcc`)};
    color: ${props => (props.primary ? 'white' : `#fb5f04`)};
  }

  &:active {
    transform: translateY(1px);
    transition: all 0.2s ease 0s;
  }

  &:disabled {
    cursor: default;
    transform: translateY(0px);
    color: var(--dark_gray);
    box-shadow: 0px 0px 0px rgba(176, 86, 26, 0);
    border: 2px solid var(--light_gray);
    background: #efefef;
  }
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid var(--secondary);
  border-right: 2px solid var(--secondary);
  border-bottom: 2px solid white;
  border-left: 2px solid white;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

export const ButtonWithIcon = styled(Container)`
  svg {
    margin-right: 8px;
  }
`;
