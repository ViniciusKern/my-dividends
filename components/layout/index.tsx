import React, { ReactNode } from 'react';
import { createStyles } from '@mantine/core';

import AppHeader from './header';
import AppFooter from './footer';

function Layout({ children }: { children: ReactNode }) {
  const { classes } = useStyles();

  return (
    <>
      <AppHeader />
      <main className={classes.main}>{children}</main>
      <AppFooter />
    </>
  );
}

const useStyles = createStyles(theme => ({
  main: {
    padding: `calc(${theme.spacing.xl} * 1.5)`,
    paddingTop: `calc(${theme.spacing.xl} * 1)`,
  },
}));

export default Layout;
