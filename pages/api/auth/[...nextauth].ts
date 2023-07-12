import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

import { User } from '@/types/user.type';
import { connectToDatabase, verifyPassword } from '@/utils/api-utils';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async credentials => {
        if (!credentials) {
          throw new Error('Invalid credentials!');
        }

        const { db, close } = await connectToDatabase();
        const collection = db.collection('users');

        const user: User | null = await collection.findOne<User>({
          email: credentials.email,
        });

        if (!user) {
          throw new Error('User not found!');
        }

        const valid = await verifyPassword(credentials.password, user.password);

        if (!valid) {
          throw new Error('Invalid password!');
        }

        close();

        return {
          id: String(user._id),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
});
