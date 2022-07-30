import styled from 'styled-components';
import { ThemeProps } from '../../../assets/styles/themes';

export const Container = styled.div<{ theme: ThemeProps }>`
  display: flex;
  align-items: center;

  span {
    margin-right: 8px;
  }

  button {
    font-size: 22px;
    padding: 0 8px;
    background: ${({ theme }) => theme.colors.primary.light};

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
    }

    &:first-child {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }

    &:last-child {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }

  .selected {
    background: ${({ theme }) => theme.colors.primary.dark};
  }
`;
