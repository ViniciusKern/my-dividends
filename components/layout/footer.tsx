import { createStyles, Text, rem } from '@mantine/core';

function AppFooter() {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Text color='dimmed' size='sm' align='center'>
        © {new Date().getFullYear()} VK SOFTWARE LTDA, All rights reserved.
      </Text>
    </footer>
  );
}

const useStyles = createStyles(theme => ({
  footer: {
    paddingTop: `calc(${theme.spacing.md} * 1)`,
    paddingBottom: `calc(${theme.spacing.md} * 1)`,
    backgroundColor: theme.colors.gray[0],
    borderTop: `${rem(1)} solid ${theme.colors.gray[2]}`,
  },
}));

export default AppFooter;
