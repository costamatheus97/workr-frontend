import React, { useState, useEffect, useCallback } from 'react';

import { Link } from 'react-router-dom';

import { useAuth } from '../../../context/AuthContext';

import CandidatedJobs from '../../../context/AuthContext';

import api from '../../../services/api';

import { useToast } from '../../../context/ToastContext';

import UsersHeader from '../../../components/UsersHeader';
import { Container, JobContainer } from './styles';

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<CandidatedJobs[]>();

  const token = localStorage.getItem('@workr:token');
  const { user } = useAuth();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  interface User {
    data: {
      candidated_jobs: CandidatedJobs[];
    };
  }

  async function getUser(): Promise<User> {
    const { _id } = user;

    return api.get(`/users/${_id}`, config);
  }

  const fetchJobs = useCallback(async () => {
    const { data } = await getUser();

    setJobs(data.candidated_jobs);
  }, []);

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <UsersHeader />
      <Container>
        {jobs && jobs.length > 0 ? (
          jobs.map(job => {
            return (
              <JobContainer key={job?._id}>
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
                  <p>Status: Pendente</p>
                </div>
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
