import styled from 'styled-components';

export const Container = styled.ul`
  margin-top: 3rem;
`;

export const JobContainer = styled.li`
  border: 1px solid #fff;
  border-radius: 4px;
  margin: 0 1rem;
  padding: 0 1rem;
  height: 120px;
  text-align: left;

  display: flex;
  align-items: center;

  & + li {
    margin-top: 24px;
  }

  div {
    list-style: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      margin-bottom: 1rem;
      font-size: 12px;
    }

    p {
      font-size: 18px;
    }

    button {
      background: #eb4f42;
      border: 0;
      outline: 0;
      border-radius: 4px;
      width: 24px;
      height: 24px;

      svg {
        path {
          fill: #eb4f42;
        }
      }
    }
  }
`;
