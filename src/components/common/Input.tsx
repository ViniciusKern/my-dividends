import styled, { css } from 'styled-components';
import { ThemeProps } from '../../assets/styles/themes';

type Props = {
  theme: ThemeProps;
  error?: boolean;
};

export default styled.input<Props>`
  width: 100%;
  outline: none;
  background: ${({ theme }: ThemeProps) => theme.colors.background};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  height: 32px;
  border-radius: 4px;
  padding: 0 16px;
  font-size: 16px;
  border: 2px solid rgb(219, 226, 235);
  appearance: none;
  transition: border-color 0.2s ease-in;

  &:focus {
    border-color: ${({ theme }: ThemeProps) => theme.colors.primary.main};
  }

  ${({ theme, error }) =>
    error &&
    css`
      color: ${theme.colors.danger.main};
      border-color: ${theme.colors.danger.main} !important;
    `}
`;
