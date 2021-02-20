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
import ProfilePictureDropzoneComponent from '../../../components/ProfilePictureDropzone';
import BannerDropzoneComponent from '../../../components/BannerDropzone';

import { useAuth } from '../../../context/AuthContext';

import { UpperContainer, FormContainer } from './styles';

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
  const { user } = useAuth();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const formRef = useRef<FormHandles>(null);
  const pictureFormRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  async function fetchData(): Promise<void> {
    const { data } = await api.get(`/companies/${user._id}`, config);

    if (formRef.current) {
      formRef.current.setData({
        city: data[0].city,
        state: data[0].state,
        country: data[0].country,
        cep: data[0].cep,
        cnpj: data[0].cnpj,
        description: data[0].description,
        employees: data[0].employees,
        field: data[0].field,
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handlePicturesSubmit = useCallback(async data => {}, []);

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

        await api.put('/companies', data, config);

        addToast({
          type: 'success',
          title: 'Cadastro atualizado',
          description: 'Seu cadastro foi atualizado com sucesso.',
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
            'Ocorreu um erro ao atualizar o cadastro, tente novamente.',
        });
      }
    },
    [addToast],
  );

  return (
    <>
      <Header />
      <UpperContainer>
        <Form ref={pictureFormRef} onSubmit={handlePicturesSubmit}>
          <BannerDropzoneComponent>Banner</BannerDropzoneComponent>
          <ProfilePictureDropzoneComponent>
            Profile Picture
          </ProfilePictureDropzoneComponent>
          <h1>{user.company_name}</h1>
        </Form>
      </UpperContainer>

      <FormContainer>
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
      </FormContainer>
    </>
  );
};

export default UpdateProfile;
