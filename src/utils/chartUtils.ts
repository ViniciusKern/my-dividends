import { Dividend } from '../types/dividends.type';

type MonthColumn = {
  key: string;
  label: string;
};

function mapToMonthColum(date: Date): MonthColumn {
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return {
    key: `${date.getMonth()}-${year}`,
    label: `${month} ${year}`,
  };
}

type ChartDataResponse = {
  values: Array<{ x: string; y: string }>;
  groups: Map<number, number>;
};

export function generateChartData(
  dividends: Dividend[],
  startDate: Date,
  endDate: Date
): ChartDataResponse {
  const months: MonthColumn[] = [];
  const groups = new Map<number, number>();

  let auxDate = new Date(startDate.getTime());

  while (auxDate.getTime() < endDate.getTime()) {
    months.push(mapToMonthColum(auxDate));

    const year = auxDate.getFullYear();

    groups.set(year, (groups.get(year) ?? 0) + 1);

    auxDate = new Date(auxDate.setMonth(auxDate.getMonth() + 1));
  }

  const values = months.map(monthYear => {
    const values = dividends
      .filter(dividend => mapToMonthColum(dividend.paymentDate).key === monthYear.key)
      .map(dividend => dividend.cashAmount);

    let sum = 0;

    values.forEach(value => {
      sum += Number(value);
    });

    return { x: monthYear.label, y: sum.toFixed(2) };
  });

  return { values, groups };
}
