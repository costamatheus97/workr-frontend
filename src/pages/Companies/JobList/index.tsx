import React, { useState, useEffect, useCallback } from 'react';

import { Link } from 'react-router-dom';

import { FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';

import api from '../../../services/api';

import { useToast } from '../../../context/ToastContext';

import CompanyHeader from '../../../components/CompanyHeader';
import { Container, JobContainer } from './styles';

interface Job extends Array<Job> {
  title?: string;
  description?: string;
  company?: string;
  level?: string;
  _id?: string;
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job>();

  const token = localStorage.getItem('@workr:token');
  const { user } = useAuth();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const { addToast } = useToast();

  async function deleteJobHandler(id: string | undefined): Promise<void> {
    try {
      await api.delete(`/jobs/${id}`, config);
      const updatedJobs = jobs?.filter(job => job?._id !== id);

      setJobs(updatedJobs);

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

  const fetchJobs = useCallback(async () => {
    const { data } = await api.get(`/jobs/company/${user._id}`, config);

    setJobs(data);
  }, []);

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <CompanyHeader />
      <Container>
        {jobs && jobs.length > 0 ? (
          jobs.map(job => {
            return (
              <JobContainer key={job?._id}>
                <Link to={`/companies/jobs/${job?._id}`}>
                  <div>
                    <span>Título</span>
                    <p>{job?.title}</p>
                  </div>
                  <div>
                    <span>Nível</span>
                    <p>{job?.level}</p>
                  </div>
                  <div>
                    <span>Empresa</span>
                    <p>{job?.company}</p>
                  </div>
                  <div>
                    <span>Descrição</span>
                    <p>{job?.description}</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => deleteJobHandler(job?._id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </Link>
              </JobContainer>
            );
          })
        ) : (
          <h1>Não encontramos nenhuma vaga</h1>
        )}
      </Container>
    </>
  );
};

export default JobList;
