import styled, { css } from 'styled-components';

import { ToastType } from '../toast.types';

const containerTypes = {
  default: css`
    background: #007bff;
  `,
  success: css`
    background: #28a745;
  `,
  error: css`
    background: #dc3545;
  `,
};

export const Container = styled.div<{ type: ToastType }>`
  padding: 8px 32px;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  opacity: 0.85;

  ${({ type }) => containerTypes[type]}

  & + & {
    margin-top: 8px;
  }
`;
