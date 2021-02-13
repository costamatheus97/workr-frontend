import { FiArrowLeft, FiMail, FiLock, FiUser, FiPhone } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../../services/api';

import { useToast } from '../../../context/ToastContext';

import getValidationErrors from '../../../utils/getValidationErrors';

import logoImg from '../../../assets/logo.svg';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { Container, Content, AnimatedContainer, Background } from './styles';

interface SignUpFormData {
  full_name: string;
  phone: string;
  email: string;
  hash: string;
}

const UserSignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          full_name: Yup.string().required('Nome Obrigatório'),
          phone: Yup.string().required('Celular obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          hash: Yup.string().min(8, 'No mínimo 8 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/signin/users');

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você já pode fazer o seu login',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao fazer cadastro, verifique os dados e tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimatedContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input
              name="full_name"
              icon={FiUser}
              type="text"
              placeholder="Nome Completo"
            />
            <Input
              name="phone"
              icon={FiPhone}
              type="text"
              placeholder="Celular"
            />
            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
            />
            <Input
              name="hash"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/signin/users">
            <FiArrowLeft />
            Voltar para o login
          </Link>
        </AnimatedContainer>
      </Content>
    </Container>
  );
};

export default UserSignUp;
