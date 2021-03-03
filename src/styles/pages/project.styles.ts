import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;

  justify-self: center;
  align-self: flex-start;

  hr {
    border: 0;
    border-top: 1px solid var(--light_gray);
    margin: 0.5rem 0;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5rem;
  /* max-width: 800px; */

  @media (max-width: 800px) {
    grid-template-columns: repeat(auto-fit, minmax(750px, 1fr));
  }
`;

export const PreviewContainer = styled.div`
  p {
    margin-top: 8px;
  }
`;
export const SectionInfoContainer = styled.div`
  display: flex;
  margin-top: 8px;

  svg {
    margin: 0 4px 0 16px;
  }
`;

export const ProjectNameContainer = styled.div`
  display: flex;
  margin-top: 8px;
  align-items: center;

  svg {
    color: var(--secondary);
    margin: 0 4px 0 8px;
  }
`;

export const EditingContainer = styled.div``;

export const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
  }
`;
