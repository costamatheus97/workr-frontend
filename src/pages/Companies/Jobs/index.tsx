import React, { useCallback, useRef } from 'react';

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

import { useAuth } from '../../../context/AuthContext';

import { FormContainer } from './styles';

interface JobFormData {
  company?: string;
  title: string;
  city: string;
  state: string;
  country: string;
  pay_range: string;
  level: string;
  employment_type: string;
  description: string;
  requirements: [string];
  field: string;
}

const UpdateProfile: React.FC = () => {
  const token = localStorage.getItem('@workr:token');
  const { user } = useAuth();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: [JobFormData]) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Campo obrigatório'),
          city: Yup.string().required('Campo obrigatório'),
          state: Yup.string().required('Campo obrigatório'),
          country: Yup.string().required('Campo obrigatório'),
          pay_range: Yup.string(),
          level: Yup.string().required('Campo obrigatório'),
          employment_type: Yup.string().required('Campo obrigatório'),
          field: Yup.string().required('Campo obrigatório'),
          description: Yup.string().required('Campo obrigatório'),
          requirements: Yup.string().required('Campo obrigatório'),
        });

        const newData = { company: user.company_name, ...data };

        await schema.validate(newData, {
          abortEarly: false,
        });

        await api.post('/jobs', newData, config);

        addToast({
          type: 'success',
          title: 'Vaga publicada',
          description: 'Sua vaga foi publicada com sucesso.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
        addToast({
          type: 'error',
          title: 'Erro na publicação da vaga',
          description:
            'Ocorreu um erro ao publicar a vaga, verifique os campos e tente novamente.',
        });
      }
    },
    [addToast],
  );

  return (
    <>
      <Header />
      <FormContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="title"
            icon={FiUser}
            type="text"
            placeholder="Título da vaga"
          />
          <Input name="city" icon={FiUser} type="text" placeholder="Cidade" />
          <Input name="state" icon={FiUser} type="text" placeholder="Estado" />
          <Input name="country" icon={FiUser} type="text" placeholder="País" />
          <Input
            name="pay_range"
            icon={FiUser}
            type="text"
            placeholder="Faixa salarial"
          />
          <Input
            name="level"
            icon={FiUser}
            type="text"
            placeholder="Nível da vaga (Ex: Júnior, Pleno)"
          />
          <Input
            name="employment_type"
            icon={FiUser}
            type="text"
            placeholder="Tipo de Contrato"
          />
          <Input
            name="field"
            icon={FiUser}
            type="text"
            placeholder="Área de atuação da empresa"
          />
          <Input
            name="description"
            icon={FiUser}
            type="text"
            placeholder="Descrição da vaga"
          />
          <Input
            name="requirements"
            icon={FiUser}
            type="text"
            placeholder="Requisitos (Ex: Javascript, React)"
          />
          <Button type="submit">Publicar vaga</Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UpdateProfile;
