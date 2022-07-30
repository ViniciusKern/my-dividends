import styled from 'styled-components';
import { ThemeProps } from '../../assets/styles/themes';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 24px;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  margin: 24px auto;
  padding: 24px;
  background: white;
  width: 100%;
  max-width: 400px;
  border-radius: 4px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);

  button {
    width: 100%;
  }

  a {
    text-align: center;
  }

  .submit-button {
    margin-top: 16px;
  }
`;

export const Title = styled.h1`
  color: ${({ theme }: ThemeProps) => theme.colors.primary.main};
  text-align: center;
`;

export const Header = styled.h2`
  color: ${({ theme }: ThemeProps) => theme.colors.gray.dark};
  text-align: center;
`;

export const Separator = styled.hr`
  width: 100%;
  margin: 16px 0;
  border-radius: 2px;
  border-top: 1px solid rgb(219, 226, 235);
`;

export const ButtonInnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;
