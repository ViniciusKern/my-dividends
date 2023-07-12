import Image from 'next/image';
import { createStyles, Header, Container, Group, Text, Button, Title } from '@mantine/core';
import { useSession, signOut } from 'next-auth/react';

import logo from '../../public/logo.png';

function AppHeader() {
  const { classes } = useStyles();
  const { data: session, status } = useSession();

  const isAuthenticated = status === 'authenticated';

  async function handleLogout() {
    await signOut();
  }

  return (
    <Header height={80} pb={10} pt={10}>
      <Container className={classes.header}>
        <Group>
          <Image src={logo} alt='Logo' width={23} height={46} />
          <Title order={1}>My Dividends</Title>
        </Group>

        {isAuthenticated && (
          <Group spacing='sm'>
            <div>
              <Text fz='xs' fw={600}>
                {session?.user?.name}
              </Text>
              <Text fz='xs' c='dimmed'>
                {session?.user?.email}
              </Text>
            </div>

            <Button variant='light' color='red' radius='xl' size='xs' onClick={handleLogout}>
              Logout
            </Button>
          </Group>
        )}
      </Container>
    </Header>
  );
}

const useStyles = createStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
}));

export default AppHeader;
