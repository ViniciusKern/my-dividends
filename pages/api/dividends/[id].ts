import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

import { connectToDatabase, isAuthenticated } from '@/utils/api-utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return;
  }

  const hasPermission = await isAuthenticated(req, res);
  if (!hasPermission) {
    return;
  }

  const { id } = req.query;

  const { db, close } = await connectToDatabase();

  try {
    await db.collection('dividends').deleteOne({ _id: new ObjectId(String(id)) });

    res.status(200).json({
      message: 'Dividend deleted!',
    });
  } finally {
    close();
  }
}
