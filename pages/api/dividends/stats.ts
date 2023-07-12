import { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase, isAuthenticated } from '@/utils/api-utils';
import { listDividends } from '.';
import { formatDateToISO } from '@/utils/date-utils';
import { Dividend } from '@/types/dividend.type';
import { Stats } from '@/types/stats.type';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return;
  }

  const hasPermission = await isAuthenticated(req, res);
  if (!hasPermission) {
    return;
  }

  const { db, close } = await connectToDatabase();
  const userId = String(req.headers.userId);

  try {
    const [startDate, endDate] = getStatsDateRange();

    const dividends = (await listDividends(
      db,
      userId,
      'all',
      formatDateToISO(startDate),
      formatDateToISO(endDate)
    )) as Dividend[];

    const year1 = startDate.getFullYear();
    const year2 = startDate.getFullYear() + 1;
    const year3 = endDate.getFullYear();

    const sum = {
      [year1]: 0,
      [year2]: 0,
      [year3]: 0,
    };

    let partialSumYear2 = 0;

    dividends.forEach(dividend => {
      const cash =
        dividend.country === 'US'
          ? Number(dividend.cashAmount) * Number(dividend.dollarRate)
          : Number(dividend.cashAmount);

      const dividendYear = dividend.paymentDate.getFullYear();
      sum[dividendYear] = sum[dividendYear] + cash;

      if (dividendYear === year2 && dividend.paymentDate.getMonth() <= endDate.getMonth()) {
        partialSumYear2 += cash;
      }
    });

    const sumYear2 = sum[year2];
    const sumYear3 = sum[year3];
    const monthAvgYear2 = sumYear2 / 12;
    const monthAvgYear3 = sumYear3 / (endDate.getMonth() + 1);

    const stats: Stats = {
      previous: {
        year: year2,
        total: sumYear2,
        totalDiff: calculatePercentageDifference(sum[year1], sumYear2),
        monthAverage: monthAvgYear2,
        monthDiff: calculatePercentageDifference(sum[year1] / 12, monthAvgYear2),
      },
      current: {
        year: year3,
        total: sumYear3,
        totalDiff: calculatePercentageDifference(partialSumYear2, sumYear3),
        monthAverage: monthAvgYear3,
        monthDiff: calculatePercentageDifference(monthAvgYear2, monthAvgYear3),
      },
    };

    res.status(200).json({
      message: 'Stats retrieved!',
      data: stats,
    });
  } finally {
    close();
  }
}

function calculatePercentageDifference(previous: number, current: number) {
  if (previous === 0) return 0;

  const difference = current - previous;
  const percentage = (difference / previous) * 100;
  return percentage;
}

function getStatsDateRange() {
  const today = new Date();
  const previousYearStart = new Date(today.getFullYear() - 2, 0, 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return [previousYearStart, lastDayOfMonth];
}
