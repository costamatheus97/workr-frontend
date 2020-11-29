import styled from 'styled-components';

import { shade } from 'polished'

import loginBackground from '../../assets/login-background.png'

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

  .login {
    margin: 80px 0;
    width: 340px;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__title {
      margin-bottom: 24px;
    }

    &__input {
      max-width: 340px;
      width: 100%;
      height: 56px;
      background: #232129;
      border: 2px solid #232129;
      border-radius: 10px;
      padding: 1rem;
      color: #F4EDE8;

      & + input {
        margin-top: 8px;
      }

      &::placeholder {
        color: #666360;
      }
    }

    &__submit {
      margin: 24px 0;
      max-width: 340px;
      width: 100%;
      height: 56px;
      background: #FF9000;
      border-radius: 10px;
      border: 0;
      font-weight: 600;
      color: #312E38;
      transition: all .2s ease-in-out;

      &:hover{
        background: ${shade(0.2, '#ff9000')}
      }
    }

    &__change-password{
      color: #F4EDE8;
      font-family: 'Roboto Slab', serif;
      transition: all .2s ease-in-out;

      &:hover {
        color: ${shade(0.2, '#f4ede8')}
      }
    }
  }

  .register {
    color: #FF9000;
    display: flex;
    align-items: center;
    transition: all .2s ease-in-out;

    &:hover {
      color: ${shade(0.2, '#ff9000')}
    }

    svg {
      margin-right: 1rem;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${loginBackground}) no-repeat center;
  background-size: cover;
`;
