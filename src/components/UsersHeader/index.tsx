import React from 'react';

import { Container } from './styles';

const CompanyHeader: React.FC = () => {
  return (
    <Container>
      <div>
        <a href="/users/dashboard">Logo</a>
        <div>
          <a href="/users/jobs">Ver vagas</a>
          <a href="/users/profile">Minha Conta</a>
        </div>
      </div>
    </Container>
  );
};

export default CompanyHeader;
