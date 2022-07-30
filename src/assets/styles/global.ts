import { createGlobalStyle } from 'styled-components';
import { ThemeProps } from './themes';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Source Sans Pro', sans-serif;
  }

  body {
    background: ${({ theme }: ThemeProps) => theme.colors.background};
    font-size: 16px;
    color: ${({ theme }: ThemeProps) => theme.colors.gray.main};
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
  }

  a {
    text-decoration: none;
  }

  a:link, a:visited {
    color: inherit;
  }

  .link {
    height: 36px;
    display: inline-block;
    padding: 8px 16px;
    border: none;
    background: ${({ theme }) => theme.colors.primary.main};
    font-size: 16px;
    color: #fff !important;
    border-radius: 4px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
    transition: background 0.1s ease-in;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.light};
    }

    &:active {
      background: ${({ theme }) => theme.colors.primary.dark};
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    img {
      width: 18px;
      height: 18px;
      filter: invert();
    }
  }
`;
