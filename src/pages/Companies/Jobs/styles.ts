import styled from 'styled-components';

export const UpperContainer = styled.div`
  margin-bottom: 2rem;
  form {
    position: relative;
  }

  input {
    display: flex;
    align-items: center;
  }

  .profile_dropzone {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 2rem;
  }

  h1 {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 15rem;
  }
`;

export const FormContainer = styled.div``;
