type ColorLevels = {
  light: string;
  main: string;
  dark: string;
};

export type Theme = {
  colors: {
    background: string;
    lightBackground: string;
    primary: ColorLevels;
    gray: ColorLevels;
    danger: ColorLevels;
  };
};

export type ThemeProps = { theme: Theme };

export const defaultTheme: Theme = {
  colors: {
    background: '#fafafa',
    lightBackground: '#f1f1f1',
    primary: {
      light: '#2f9ae9',
      main: '#1680d0',
      dark: '#0964a3',
    },
    gray: {
      light: '#a6a6a6',
      main: '#595959',
      dark: '#292526',
    },
    danger: {
      light: '#F97171',
      main: '#fc5050',
      dark: '#f63131',
    },
  },
};
