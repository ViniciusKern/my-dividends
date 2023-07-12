import { NextApiRequest, NextApiResponse } from 'next';
import { Db, ObjectId } from 'mongodb';

import { connectToDatabase, isAuthenticated } from '@/utils/api-utils';
import { Dividend } from '@/types/dividend.type';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const hasPermission = await isAuthenticated(req, res);
  if (!hasPermission) {
    return;
  }

  const { db, close } = await connectToDatabase();
  const userId = String(req.headers.userId);

  try {
    if (req.method === 'GET') {
      const country = req.query.country ? String(req.query.country) : 'all';
      const startDate = req.query.start_date ? String(req.query.start_date) : null;
      const endDate = req.query.end_date ? String(req.query.end_date) : null;

      const dividends = await listDividends(db, userId, country, startDate, endDate);

      res.status(200).json({
        data: { dividends },
        message: 'Dividends list retrieved',
      });
    } else if (req.method === 'POST') {
      const cashAmount = req.body.cashAmount;
      const paymentDate = req.body.paymentDate;
      const refStock = req.body.refStock;
      const country = req.body.country;
      const dollarRate = req.body.dollarRate;

      if (!cashAmount || !paymentDate || !refStock || !country) {
        res.status(422).json({ message: 'Invalid dividend params!' });
        return;
      }

      await insertDividend(db, {
        refUser: userId,
        refStock,
        country,
        dollarRate,
        cashAmount,
        paymentDate,
      });

      res.status(200).json({
        message: 'Dividend added!',
      });
    }
  } finally {
    close();
  }
}

export async function listDividends(
  db: Db,
  userId: string,
  country: string,
  startDate: string | null,
  endDate: string | null
) {
  const matchers: any = {
    refUser: new ObjectId(userId),
  };

  if (country && country != 'all') {
    matchers.country = country;
  }

  if (startDate && endDate) {
    const [start, end] = getDatesRange(startDate, endDate);

    matchers.paymentDate = {
      $gte: start,
      $lte: end,
    };
  }

  const dividends = await db
    .collection('dividends')
    .aggregate([
      {
        $match: matchers,
      },
      {
        $lookup: {
          from: 'stocks',
          localField: 'refStock',
          foreignField: '_id',
          as: 'stock',
        },
      },
      {
        $unwind: '$stock',
      },
    ])
    .toArray();

  return dividends;
}

async function insertDividend(db: Db, dividend: Dividend) {
  await db.collection('dividends').insertOne({
    refUser: new ObjectId(dividend.refUser),
    refStock: new ObjectId(dividend.refStock),
    country: dividend.country,
    dollarRate: dividend.dollarRate,
    cashAmount: dividend.cashAmount,
    paymentDate: new Date(dividend.paymentDate),
  });
}

function getDatesRange(startYearMonth: string, endYearMonth: string): [Date, Date] {
  const [year1, month1] = startYearMonth.split('-').map(Number);
  const [year2, month2] = endYearMonth.split('-').map(Number);
  const firstDayOfMonth = new Date(year1, month1 - 1, 1);
  const lastDayOfMonth = new Date(year2, month2, 0);
  return [firstDayOfMonth, lastDayOfMonth];
}
