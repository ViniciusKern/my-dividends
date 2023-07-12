import { FormEvent, useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
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
import { signUp } from '@/services/user.service';
import { showError } from '@/utils/notification-utils';

function SignUp() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [router, status]);

  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await signUp({ name, email, password });
      await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
    } catch (error) {
      showError(`Erro ao fazer cadastro: ${error}`);
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
          <TextInput label='Nome' required value={name} onChange={handleChangeName} />
          <TextInput
            label='Email'
            required
            mt='md'
            type='email'
            value={email}
            onChange={handleChangeEmail}
          />
          <PasswordInput
            label='Senha'
            required
            mt='md'
            value={password}
            onChange={handleChangePassword}
          />

          <Button type='submit' fullWidth mt='xl'>
            Cadastrar
          </Button>

          <Text color='dimmed' size='sm' align='center' mt={24}>
            Já tem uma conta? <Link href='/login'>Fazer login</Link>
          </Text>
        </form>
      </Paper>
    </Container>
  );
}

export default SignUp;
