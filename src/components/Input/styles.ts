import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  max-width: 340px;
  width: 100%;
  height: 56px;
  background: #eeeeee;
  border-radius: 10px;
  padding: 1rem;
  color: #666360;
  transition: all 0.2s ease-in-out;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #2e70d9;
      border-color: #2e70d9;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #2e70d9;
    `}

  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 1rem;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 1rem;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &:before {
      border-color: #c53030 transparent;
    }
  }
`;
