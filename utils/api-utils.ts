import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { compare, hash } from 'bcryptjs';

import { User } from '@/types/user.type';
import { getToken } from 'next-auth/jwt';

export async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.DB_CONNECTION_URL ?? '');
  const db = client.db('my-dividends-app');

  const closeDatabase = () => {
    client.close();
  };

  return { db, close: closeDatabase };
}

export async function isAuthenticated(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });

  if (!token) {
    res.status(401).json({ message: 'Not authenticated!' });
    return false;
  }

  const { db, close } = await connectToDatabase();
  const collection = db.collection('users');

  const user: User | null = await collection.findOne<User>({
    email: token.email,
  });

  close();

  if (!user) {
    res.status(404).json({ message: `User not found for email '${token.email}'!` });
    return false;
  }

  req.headers.userId = String(user._id);
  req.headers.userEmail = String(user.email);
  return true;
}

export function isEmailValid(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
