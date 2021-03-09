import React from 'react';

import { useHistory } from 'react-router-dom';

import { Container } from './styles';

const CompanyHeader: React.FC = () => {
  const history = useHistory();

  const logoutHandler = (): void => {
    setTimeout(() => {
      history.go(0);
    }, 100);

    localStorage.removeItem('@workr:token');
    localStorage.removeItem('@workr:user');
  };

  return (
    <Container>
      <div>
        <a href="/users/dashboard">Logo</a>
        <div>
          <a href="/users/jobs/list">Ver vagas</a>
          <a href="/users/jobs/my-jobs">Minhas vagas</a>
          <a href="/users/profile">Minha Conta</a>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </div>
    </Container>
  );
};

export default CompanyHeader;
