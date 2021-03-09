import React, { useState, useEffect, useCallback } from 'react';

import { FiUserCheck } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';

import api from '../../../services/api';

import { useToast } from '../../../context/ToastContext';

import UsersHeader from '../../../components/UsersHeader';
import {
  Container,
  Job,
  CurrentJobContainer,
  CurrentJob,
  JobListContainer,
  Filter,
} from './styles';

interface Job extends Array<Job> {
  candidates?: [string];
  title?: string;
  description?: string;
  company?: string;
  level?: string;
  pay_range?: string;
  employment_tipe?: string;
  field?: string;
  _id?: string;
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job>();
  const [currentJob, setCurrentJob] = useState<Job>();

  const token = localStorage.getItem('@workr:token');
  const { user } = useAuth();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const { addToast } = useToast();

  const fetchJobs = useCallback(async () => {
    const { data } = await api.get(`/jobs`, config);
    setJobs(data);
    setCurrentJob(data[0]);
  }, []);

  useEffect(() => {
    fetchJobs();
  }, []);

  function changeCurrentJobHandler(jobId: string | undefined): void {
    const currentJobData = jobs?.find(job => job?._id === jobId);

    setCurrentJob(currentJobData);
  }

  function checkIsCandidated(jobId: string | undefined): boolean {
    const currentJobData = jobs?.find(job => job?._id === jobId);

    if (user?._id && currentJobData?.candidates?.includes(user._id)) {
      return true;
    }
    return false;
  }

  async function candidateJobHandler(id: string | undefined): Promise<void> {
    try {
      const jobData = {
        candidates: user._id,
      };

      const { data } = await api.get(`/jobs/${id}`, config);

      const { candidated_jobs } = user;

      if (id) {
        candidated_jobs?.push({
          job_id: id,
          title: data.title,
          company: data.company,
          pay_range: data.pay_range,
          level: data.level,
          status: 'pending',
        });
      }

      await api.put(`/jobs/candidate/${id}`, jobData, config);
      await api.put(`/users/`, { candidated_jobs }, config);
      await fetchJobs();

      addToast({
        type: 'success',
        title: 'Candidatura enviada',
        description: 'Sua candidatura foi enviada com sucesso, boa sorte!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro',
        description:
          'Erro na candidatura, tente novamente ou contate o suporte',
      });
    }
  }

  return (
    <>
      <UsersHeader />
      <Container>
        <Filter>
          <h1>filter</h1>
        </Filter>
        <JobListContainer>
          {jobs && jobs.length > 0 ? (
            jobs.map(job => {
              return (
                <Job
                  key={job?._id}
                  onClick={() => changeCurrentJobHandler(job?._id)}
                >
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
                    {checkIsCandidated(job?._id) ? (
                      <p className="candidature__status">
                        Você já se candidatou a essa vaga
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => candidateJobHandler(job?._id)}
                      >
                        <FiUserCheck />
                      </button>
                    )}
                  </div>
                </Job>
              );
            })
          ) : (
            <h1>Não encontramos nenhuma vaga</h1>
          )}
        </JobListContainer>
        <CurrentJobContainer>
          {currentJob && (
            <CurrentJob>
              <h1>{currentJob.title}</h1>
              <p>{`Nível da vaga: ${currentJob.level}`}</p>
              <p>{`Empresa: ${currentJob.company}`}</p>
            </CurrentJob>
          )}
        </CurrentJobContainer>
      </Container>
    </>
  );
};

export default JobList;
