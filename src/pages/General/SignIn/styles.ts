import styled, { keyframes } from 'styled-components';

import { shade } from 'polished';

import loginBackground from '../../../assets/login-background.png';

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
  flex-direction: column;
  align-items: center;
  width: 100%;

  animation: ${appearFromRight} 1s;

  div {
    margin: 80px 0;
    display: flex;
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 160px;
    height: 160px;
    border: 1px solid #fff;
    border-radius: 4px;

    color: #fff;

    & + a {
      margin-left: 24px;
    }

    svg {
      margin-bottom: 24px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${loginBackground}) no-repeat center;
  background-size: cover;
`;
