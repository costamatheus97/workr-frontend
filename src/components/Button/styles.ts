import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.button`
  margin: 24px 0;
  max-width: 340px;
  width: 100%;
  height: 56px;
  background: #ff9000;
  border-radius: 10px;
  border: 0;
  font-weight: 600;
  color: #312e38;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
