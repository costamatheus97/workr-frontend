import React from 'react';

const UsersHeader: React.FC = () => {
  return (
    <header>
      <div>
        <h1>Logo</h1>
      </div>
      <div>
        <a href="/users/dashboard">Início</a>
        <a href="/users/profile">Minha Conta</a>
      </div>
    </header>
  );
};

export default UsersHeader;
