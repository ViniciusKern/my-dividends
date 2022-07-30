import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '../../components/common/Button';
import FormGroup from '../../components/common/FormGroup';
import Input from '../../components/common/Input';
import Spinner from '../../components/common/Spinner/Spinner';
import AuthService from '../../firebase/services/AuthService';
import { isEmailValid } from '../../utils/validations';
import {
  LoginContainer,
  Header,
  Separator,
  Title,
  Container,
  ButtonInnerContainer,
} from './styles';

enum Mode {
  LOGIN,
  REGISTER,
}

type LoginInputs = {
  name: string;
  email: string;
  password: string;
};

export default function Login() {
  const [mode, setMode] = useState(Mode.LOGIN);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<LoginInputs>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<LoginInputs> = data => handleLogin(data);

  function handleChangeMode() {
    setMode(mode === Mode.LOGIN ? Mode.REGISTER : Mode.LOGIN);
    reset();
  }

  async function handleLogin({ name, email, password }: LoginInputs) {
    try {
      setIsLoading(true);

      if (mode === Mode.LOGIN) {
        await AuthService.login(email, password);
      } else {
        await AuthService.registerNewUser(name, email, password);
      }
    } catch (error: any) {
      setError('email', { type: 'custom', message: error.message });
    } finally {
      setIsLoading(false);
    }
  }

  const isLogin = mode === Mode.LOGIN;

  const headerLabel = isLogin ? 'Login' : 'New Account';
  const submitLabel = isLogin ? 'Login' : 'Register';
  const changeModeLabel = isLogin ? 'Create a new Account' : 'Sign in';

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;

  return (
    <Container>
      <Title>My Dividends</Title>
      <LoginContainer>
        <Header>{headerLabel}</Header>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {!isLogin && (
            <FormGroup>
              <Input placeholder='Name' {...register('name')} />
            </FormGroup>
          )}
          <FormGroup error={emailError}>
            <Input
              type='email'
              placeholder='Email'
              {...register('email', {
                required: 'Email is required',
                validate: {
                  validEmail: email => isEmailValid(email) || 'Invalid email',
                },
              })}
              error={Boolean(emailError)}
            />
          </FormGroup>
          <FormGroup error={passwordError}>
            <Input
              type='password'
              placeholder='Password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
              error={Boolean(passwordError)}
            />
          </FormGroup>

          <Button type='submit' className='submit-button' disabled={isLoading}>
            <ButtonInnerContainer>
              {submitLabel}
              {isLoading && <Spinner size={16} />}
            </ButtonInnerContainer>
          </Button>
        </form>

        <Separator />
        <Button variant='secondary' onClick={handleChangeMode}>
          {changeModeLabel}
        </Button>
      </LoginContainer>
    </Container>
  );
}
