import { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase, isAuthenticated } from "@/utils/api-utils";
import { listDividends } from ".";
import { formatDateToISO } from "@/utils/date-utils";
import { Dividend } from "@/types/dividend.type";
import { DividendStat } from "@/types/stats.type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return;
  }

  const hasPermission = await isAuthenticated(req, res);
  if (!hasPermission) {
    return;
  }

  const { db, close } = await connectToDatabase();
  const userId = String(req.headers.userId);

  try {
    const today = new Date();
    const currentYear = today.getFullYear();
    const lastYear = today.getFullYear() - 1;
    const lastDayOfCurrentMonth = new Date(
      currentYear,
      today.getMonth() + 1,
      0
    );

    const lastYearStart = new Date(lastYear, 0, 1);

    const dividendList = (await listDividends(
      db,
      userId,
      "all",
      formatDateToISO(lastYearStart),
      formatDateToISO(lastDayOfCurrentMonth)
    )) as Dividend[];

    const dividendSum = {
      [currentYear]: 0,
      [lastYear]: 0,
    };

    let lastYearSamePeriodSum = 0;

    dividendList.forEach((dividend) => {
      const cash =
        dividend.country === "US"
          ? Number(dividend.cashAmount) * Number(dividend.dollarRate)
          : Number(dividend.cashAmount);

      const dividendYear = dividend.paymentDate.getFullYear();
      dividendSum[dividendYear] = dividendSum[dividendYear] + cash;

      if (
        dividendYear === lastYear &&
        dividend.paymentDate.getMonth() <= today.getMonth()
      ) {
        lastYearSamePeriodSum += cash;
      }
    });

    const lastYearMonthAvg = dividendSum[lastYear] / 12;
    const currentYearMonthAvg =
      dividendSum[currentYear] / (today.getMonth() + 1);

    const result: DividendStat[] = [
      {
        title: `Monthly Average ${lastYear}`,
        value: lastYearMonthAvg,
      },
      {
        title: `Monthly Average ${currentYear}`,
        value: currentYearMonthAvg,
        diff: calculatePercentageDifference(
          lastYearMonthAvg,
          currentYearMonthAvg
        ),
        comparingBasis: `comparing to ${lastYear}`,
      },
      {
        title: `Total Sum ${lastYear}`,
        value: dividendSum[lastYear],
      },
      {
        title: `Total Sum ${currentYear}`,
        value: dividendSum[currentYear],
        diff: calculatePercentageDifference(
          lastYearSamePeriodSum,
          dividendSum[currentYear]
        ),
        comparingBasis: "comparing to the same period last year",
      },
    ];

    res.status(200).json({
      message: "Stats retrieved!",
      data: result,
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
