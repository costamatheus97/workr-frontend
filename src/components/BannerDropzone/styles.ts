import styled, { css } from 'styled-components';

interface ContainerProps {
  isDragAccept: boolean;
  isDragReject: boolean;
}

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled.div<ContainerProps>`
  height: 300px;
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.2s ease-in-out;

  ${props => props.isDragAccept && dragActive}
  ${props => props.isDragReject && dragReject}

  &__ads {
  }
`;
