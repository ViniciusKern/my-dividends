import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase, hashPassword, isEmailValid } from '@/utils/api-utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return;
  }

  const { name, email, password } = req.body;

  if (!name || !email || !isEmailValid(email) || !password) {
    res.status(422).json({ message: 'Invalid params' });
    return;
  }

  const { db, close } = await connectToDatabase();
  const collection = db.collection('users');

  const existingUser = await collection.findOne({ email });

  if (existingUser) {
    res.status(422).json({ message: 'Email already used!' });
    return;
  }

  const hashedPassword = await hashPassword(password);

  await collection.insertOne({
    name,
    email,
    password: hashedPassword,
  });

  close();

  res.status(201).json({ message: 'User created!' });
}
