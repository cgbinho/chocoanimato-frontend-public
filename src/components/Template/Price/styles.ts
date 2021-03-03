import styled from 'styled-components';

export const InfoContainer = styled.div`
  padding: 0.5rem 1.5rem 1.5rem;
  p {
    margin-top: 0.2rem;
    line-height: 1.4;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  a {
    cursor: pointer;
  }
  img {
    width: 100%;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;

  /* width: 100%; */
  /* max-width: 330px; */
  overflow: hidden;

  background: white;
  border-radius: 0.5rem;
  border: 1px solid #ebebeb;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.08);
  border-radius: 14px;

  .thumbnail_classname {
    object-fit: cover;
    /* padding-top: 56.25%; */
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  align-items: center;

  del {
    font-size: 1.2rem;
    font-weight: 400;
    margin-right: 0.5rem;
  }

  span:last-child {
    font-size: 1.2rem;
    color: var(--primary);
  }
`;
