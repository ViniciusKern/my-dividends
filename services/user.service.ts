import { User } from '@/types/user.type';

export async function signUp(user: User) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'Something went wrong!');
  }

  return data;
}
