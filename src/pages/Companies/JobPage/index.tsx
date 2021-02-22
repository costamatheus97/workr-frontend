import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';

import api from '../../../services/api';

import { useToast } from '../../../context/ToastContext';

import CompanyHeader from '../../../components/CompanyHeader';
import {
  Container,
  JobContainer,
  CandidatesContainer,
  Candidate,
} from './styles';

interface User extends Array<User> {
  first_name?: string;
  city?: string;
  state?: string;
  country?: string;
  cep?: string;
  cnpj?: string;
  description?: string;
  employees?: string;
  field?: string;
  _id?: string;
}

interface Job extends Array<Job> {
  title?: string;
  description?: string;
  company?: string;
  level?: string;
  _id?: string;
}

export interface AuditCompareRouteParams {
  fileType: string;
}

const JobList: React.FC = () => {
  const [jobs, setJob] = useState<Job>();
  const [candidates, setCandidates] = useState<User>([]);

  const token = localStorage.getItem('@workr:token');
  const { user } = useAuth();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const { id } = useParams();

  const { addToast } = useToast();

  async function refuseCandidateHandler(id: string | undefined): Promise<void> {
    try {
      const updatedCandidates = candidates?.filter(
        candidate => candidate?._id !== id,
      );

      const candidatesIds: Array<string | undefined> = [];

      updatedCandidates.map(item => candidatesIds.push(item?._id));

      setCandidates(updatedCandidates);

      const postCandidate = {
        candidates: candidatesIds,
      };

      await api.put(`/jobs/${jobs?._id}`, postCandidate, config);

      addToast({
        type: 'success',
        title: 'Candidato recusado',
        description:
          'O candidato selecionado não faz mais parte do processo seletivo.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro',
        description:
          'Não conseguimos recusar esse usuário, tente novamente ou contate o suporte',
      });
    }
  }

  async function deleteJobHandler(id: string | undefined): Promise<void> {
    try {
      await api.delete(`/jobs/${id}`, config);
      const updatedJobs = jobs?.filter(job => job?._id !== id);

      setJob(updatedJobs);

      addToast({
        type: 'success',
        title: 'Vaga deletada',
        description: 'Sua vaga foi deletada com sucesso.',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro',
        description:
          'Não conseguimos deletar essa vaga, tente novamente ou contate o suporte',
      });
    }
  }

  function getCandidates(candidateId: [string]): void {
    if (candidateId) {
      candidateId.forEach(async currentCandidate => {
        const { data } = await api.get(`/users/${currentCandidate}`, config);
        setCandidates([...candidates, data]);
      });
    }
  }

  const fetchJob = useCallback(async () => {
    const { data } = await api.get(`/jobs/${id}`, config);

    setJob(data);
    getCandidates(data.candidates);
  }, []);

  useEffect(() => {
    fetchJob();
  }, []);

  return (
    <>
      <CompanyHeader />
      <Container>
        {jobs ? (
          <JobContainer key={jobs?._id}>
            <div>
              <span>Título</span>
              <p>{jobs?.title}</p>
            </div>
            <div>
              <span>Nível</span>
              <p>{jobs?.level}</p>
            </div>
            <div>
              <span>Empresa</span>
              <p>{jobs?.company}</p>
            </div>
            <div>
              <span>Descrição</span>
              <p>{jobs?.description}</p>
            </div>
            <div>
              <button type="button" onClick={() => deleteJobHandler(jobs?._id)}>
                <FiTrash2 />
              </button>
            </div>
          </JobContainer>
        ) : (
          <h1>Não encontramos nenhuma vaga</h1>
        )}
        <CandidatesContainer>
          {candidates && candidates.length > 0 ? (
            candidates.map(currentCandidate => {
              return (
                <JobContainer key={currentCandidate?._id}>
                  <div>
                    <span>Nome</span>
                    <p>{currentCandidate?.first_name}</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        refuseCandidateHandler(currentCandidate?._id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </JobContainer>
              );
            })
          ) : (
            <h1>Não encontramos nenhum candidato</h1>
          )}
        </CandidatesContainer>
      </Container>
    </>
  );
};

export default JobList;
