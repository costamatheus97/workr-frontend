import styled, { keyframes } from 'styled-components';

import { shade } from 'polished';

import registerBackground from '../../../assets/login-background.jpg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  max-width: 700px;
  width: 100%;
  overflow-x: hidden;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  } to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const AnimatedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

  animation: ${appearFromRight} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      margin-bottom: 24px;
      color: #242424;
    }

    a {
      color: #f4ede8;
      font-family: 'Roboto Slab', serif;
      transition: all 0.2s ease-in-out;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #2e70d9;
    display: flex;
    align-items: center;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: ${shade(0.2, '#2e70d9')};
    }

    svg {
      margin-right: 1rem;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${registerBackground}) no-repeat center;
  background-size: cover;
`;
