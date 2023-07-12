import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase, isAuthenticated } from '@/utils/api-utils';
import { Stock } from '@/types/stock.types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return;
  }

  const hasPermission = await isAuthenticated(req, res);
  if (!hasPermission) {
    return;
  }

  const { db, close } = await connectToDatabase();

  try {
    const result = await db.collection('stocks').find().sort({ name: 1 }).toArray();

    const stocks = result.map(item => {
      return {
        ...item,
        _id: String(item._id),
      } as Stock;
    });

    res.status(200).json({
      data: stocks,
      message: 'Stock list retrieved',
    });
  } finally {
    close();
  }
}
