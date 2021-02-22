import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 3rem;
  padding: 0 1rem;
  display: flex;
`;

export const JobListContainer = styled.ul`
  width: 40%;
`;

export const CurrentJobContainer = styled.div`
  border: 1px solid #fff;
  border-radius: 4px;
  width: 100%;
  text-align: center;
`;

export const CurrentJob = styled.div``;

export const Filter = styled.div`
  border: 1px solid #fff;
  border-radius: 4px;
  width: 300px;
  text-align: center;
`;

export const Job = styled.li`
  border: 1px solid #fff;
  border-radius: 4px;
  margin: 0 1rem;
  padding: 0 1rem;
  height: 120px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  display: flex;
  align-items: center;

  &:hover {
    border-color: orange;
  }

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
      max-width: 300px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }

    .candidature__status {
      font-size: 12px;
    }

    button {
      background: lightgreen;
      border: 0;
      outline: 0;
      border-radius: 4px;
      width: 24px;
      height: 24px;

      svg {
        path {
          fill: lightgreen;
        }
      }
    }
  }
`;
