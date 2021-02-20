import styled from 'styled-components';

export const Container = styled.header`
  padding: 0 1rem;
  background: #eeeeee;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 0 1rem;
    max-width: 1276px;
    width: 100%;
    height: 50px;

    a:not(:last-child) {
      margin-right: 1rem;
    }

    a {
      color: #242424;
    }
  }
`;
