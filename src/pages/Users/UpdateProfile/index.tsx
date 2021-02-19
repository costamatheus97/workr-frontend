import React, { useCallback, useEffect, useRef } from 'react';

import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiUser } from 'react-icons/fi';

import { useToast } from '../../../context/ToastContext';

import getValidationErrors from '../../../utils/getValidationErrors';

import api from '../../../services/api';

import Header from '../../../components/CompanyHeader';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

interface SignUpFormData {
  city: string;
  state: string;
  country: string;
  cep: string;
  cnpj: string;
  description: string;
  employees: string;
  field: string;
}

const UpdateProfile: React.FC = () => {
  const token = localStorage.getItem('@workr:token');

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  async function fetchData(): Promise<void> {
    const response = await api.get('/users', config);

    console.log(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: [SignUpFormData]) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          city: Yup.string(),
          state: Yup.string(),
          country: Yup.string(),
          cep: Yup.string(),
          cnpj: Yup.string(),
          description: Yup.string(),
          employees: Yup.string(),
          field: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put('/users', data, config);

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
    [addToast],
  );

  return (
    <>
      <Header />
      <h1>company update profile</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="city" icon={FiUser} type="text" placeholder="Cidade" />
        <Input name="state" icon={FiUser} type="text" placeholder="Estado" />
        <Input name="country" icon={FiUser} type="text" placeholder="País" />
        <Input name="cep" icon={FiUser} type="text" placeholder="CEP" />
        <Input name="cnpj" icon={FiUser} type="text" placeholder="CNPJ" />
        <Input
          name="description"
          icon={FiUser}
          type="text"
          placeholder="Descrição da Empresa"
        />
        <Input
          name="employees"
          icon={FiUser}
          type="text"
          placeholder="Número de Funcionários"
        />
        <Input
          name="field"
          icon={FiUser}
          type="text"
          placeholder="Área de Atuação da Empresa"
        />
        <Button type="submit">Cadastrar</Button>
      </Form>
    </>
  );
};

export default UpdateProfile;
