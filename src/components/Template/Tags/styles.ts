import styled from 'styled-components';

export const TagsContainer = styled.div<{ margin: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  /* margin-top: 1rem; */
  margin: ${props => props.margin};
`;

export const TagContainer = styled.div`
  display: flex;
  padding-bottom: 0.5rem;

  label {
    margin: 0 8px;
  }
  svg {
    color: var(--secondary_dark);
  }
`;
