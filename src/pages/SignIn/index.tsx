import React from 'react'
import { FiLogIn } from 'react-icons/fi'

import  logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, Background } from './styles'

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img className="logo" src={logoImg} alt="GoBarber"/>
      <form action="" className="login">
        <h1 className="login__title">
          Faça seu login
        </h1>
        <Input name="email" type="text" placeholder="E-mail" className="login__input"/>
        <Input name="password" type="password" placeholder="Senha" className="login__input"/>
        <Button type="submit" className="login__submit">
          Entrar
        </Button>
        <a href="/forgot" className="login__change-password">
          Esqueci minha senha
        </a>
      </form>

      <a href="/register" className="register">
        <FiLogIn />
        Criar conta
      </a>
    </Content>
    <Background>

    </Background>
  </Container>
)

export default SignIn
