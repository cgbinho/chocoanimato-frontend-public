import styled, { css, keyframes } from 'styled-components';
import { Shadow } from '../../styles/partials';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const TooltipTextContainer = styled.div`
  cursor: pointer;
  margin-left: 8px;
`;

export const TooltipBoxContainer = styled.div`
  p {
    color: white;
  }
  > div {
    overflow: hidden;
  }

  text-align: right;
  position: absolute;
  top: calc(100% + 15px);
  left: -250px;
  z-index: 1;
  visibility: hidden;
  color: transparent;
  background-color: transparent;
  width: 300px;
  padding: 16px 16px;
  border-radius: 8px;
  transition: visibility 0.5s, color 0.5s, background-color 0.5s, ease-in-out;
`;
// padding 0.5s, width 0.5s

export const Container = styled.div`
  position: relative;
  & ${TooltipTextContainer}:hover + ${TooltipBoxContainer} {
    visibility: visible;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.8);
    width: 300px;
    padding: 16px 16px;

    &:before {
      border-color: transparent transparent rgba(0, 0, 0, 0.8)
        rgba(0, 0, 0, 0.8);
    }
  }
`;
