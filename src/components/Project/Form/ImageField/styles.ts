import styled, { css } from 'styled-components';
import { shade, cssVar } from 'polished';

import { Stroke } from '../../../../styles/partials';
import { ButtonWithIcon } from '../../../Form/Button/styles';

const getColor = props => {
  if (props.isDragAccept) {
    return `var(--success_color)`;
  }
  if (props.isDragReject) {
    return `var(--fail_color)`;
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return `var(--gray)`;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;

  /* > p {
    color: tomato;
  } */

  hr {
    border: 0;
    border-top: 1px solid var(--light_gray);
    margin-top: 1rem;
  }

  .alpha_required {
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: space-between;
    margin-top: 16px;
  }

  > a {
    text-align: right;
    margin: 1rem 2rem;
    cursor: pointer;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const AlphaRequiredContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  p {
    margin-right: 16px;
  }

  .alphaRequiredContent {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const DropzoneContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  margin-top: 8px;
  padding: 4px;
  border: 2px dashed var(--light_gray);
  border-radius: 8px;
  border-color: ${props => getColor(props)};
  background-color: #fafafa;
  color: white;
  outline: none;
  transition: border 0.24s ease-in-out;
  transition: border-color 0.24s ease-in-out;
`;

export const DropzoneContent = styled.div<{
  isDragActive: boolean;
  preview: any;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 4rem;

  padding: 10px;
  border-radius: 4px;
  background-image: url(${props => props.preview});
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: center;

  svg {
    flex-shrink: 0;
    margin-right: 8px;
  }

  > span {
    border: 4px;
    ${Stroke}
  }
`;

export const RemoveImageContainer = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  padding: 1rem;
  height: 4rem;
  border-radius: 8px;

  svg {
    flex-shrink: 0;
  }

  span {
    font-size: small;
  }
  cursor: pointer;
`;
