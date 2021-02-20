import React from 'react';

import { Container } from './styles';

const CompanyHeader: React.FC = () => {
  return (
    <Container>
      <div>
        <a href="/companies/dashboard">Logo</a>
        <div>
          <a href="/companies/jobs/publish">Publicar uma vaga</a>
          <a href="/companies/jobs/list">Minhas vagas</a>
          <a href="/companies/profile">Minha Conta</a>
        </div>
      </div>
    </Container>
  );
};

export default CompanyHeader;
