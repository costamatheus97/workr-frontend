import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { sign } from 'crypto';
import { Link, useHistory } from 'react-router-dom';

import getValidationErrors from '../../../utils/getValidationErrors';

import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';

import logoImg from '../../../assets/logo.svg';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { Container, Content, AnimatedContainer, Background } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const CompanySignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, companySignIn } = useAuth();

  const { addToast, removeToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await companySignIn({
          email: data.email,
          hash: data.password,
        });

        history.push('/companies/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [companySignIn, addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimatedContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit} action="">
            <h1>Faça seu login</h1>
            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>
            <a href="/forgot">Esqueci minha senha</a>
          </Form>
          <Link to="/signup/companies">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimatedContainer>
      </Content>
      
    </Container>
  );
};

export default CompanySignIn;
