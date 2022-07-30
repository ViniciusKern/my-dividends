import styled from 'styled-components';
import { ThemeProps } from '../../assets/styles/themes';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  background: ${({ theme }: ThemeProps) => theme.colors.lightBackground};
  border-radius: 8px;
  height: 68px;

  .menus {
    display: flex;

    nav {
      margin-right: 24px;

      a {
        margin: 0 8px;
        padding-bottom: 4px;
        font-size: 18px;
        font-weight: bold;

        &:hover {
          color: ${({ theme }: ThemeProps) => theme.colors.primary.light};
        }
      }
    }

    .active-link {
      border-bottom: 3px solid ${({ theme }: ThemeProps) => theme.colors.primary.main};
      color: ${({ theme }: ThemeProps) => theme.colors.primary.main};
    }

    .user-info {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
      background-color: #fafafa;
      border-radius: 8px;
      margin: 0 4px;
    }

    .logout-button {
      border: none;
      background: none;
      border-radius: 16px;
      padding: 2px;

      img {
        width: 16px;
        height: 16px;
      }

      &:hover {
        background-color: #c8ccd3;
      }
    }
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 23px;
    height: 46px;
    margin-right: 8px;
  }
`;
