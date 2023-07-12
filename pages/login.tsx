import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Group,
  Button,
  Text,
} from '@mantine/core';

import logo from '../public/logo.png';
import { FormEvent, useEffect, useState } from 'react';
import { showError } from '@/utils/notification-utils';

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [router, status]);

  function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        showError(`Erro ao fazer login: ${result.error}`);
      }
    } catch (error) {
      showError(`Erro ao fazer login: ${error}`);
    }
  }

  return (
    <Container size={460} my={40}>
      <Group position='center'>
        <Image src={logo} alt='Logo' width={23} height={46} />
        <Title order={1}>My Dividends</Title>
      </Group>

      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <form onSubmit={handleSubmit}>
          <TextInput autoFocus label='Email' required value={email} onChange={handleChangeEmail} />
          <PasswordInput
            label='Senha'
            required
            mt='md'
            value={password}
            onChange={handleChangePassword}
          />

          <Button type='submit' fullWidth mt='xl'>
            Entrar
          </Button>
        </form>
        <Text color='dimmed' size='sm' align='center' mt={24}>
          Ainda não tem uma conta? <Link href='/signup'>Criar conta</Link>
        </Text>
      </Paper>
    </Container>
  );
}

export default Login;
