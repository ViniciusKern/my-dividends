import styled from 'styled-components';
import { ThemeProps } from '../../../assets/styles/themes';

export const Container = styled.div<{ theme: ThemeProps }>`
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    outline: none;
    background: ${({ theme }: ThemeProps) => theme.colors.background};
    border: 2px solid rgb(219, 226, 235);
    border-radius: 4px;
    padding: 2px;
    appearance: none;
  }
`;
