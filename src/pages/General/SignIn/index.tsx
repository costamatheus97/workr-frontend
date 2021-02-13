import React from 'react';

import { Link } from 'react-router-dom';

import { FiUser, FiBriefcase } from 'react-icons/fi';

import { Container, Background, Content, AnimatedContainer } from './styles';

import logoImg from '../../../assets/logo.svg';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Background />
      <Content>
        <AnimatedContainer>
          <img src={logoImg} alt="GoBarber" />
          <div>
            <Link to="/signin/companies">
              <FiBriefcase />
              <p>Sou empresa</p>
            </Link>
            <Link to="/signin/users">
              <FiUser />
              <p>Sou candidato</p>
            </Link>
          </div>
        </AnimatedContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
