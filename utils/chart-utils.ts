import {
  ChartData,
  ChartOptions,
  MonthColumn,
} from "@/types/chart-options.type";
import { Dividend } from "@/types/dividend.type";
import { formatCurrency } from "./currency-utils";
import { formatDateToISO } from "./date-utils";

function mapToMonthColum(date: Date): MonthColumn {
  const month = date.toLocaleString("en-us", { month: "long" });
  const year = date.getFullYear();

  return {
    key: `${date.getMonth()}-${year}`,
    label: `${month} ${year}`,
    date,
  };
}

export function generateChartData(
  dividends: Dividend[],
  chartOptions: ChartOptions
): ChartData {
  const months: MonthColumn[] = [];
  const groups = new Map<number, number>();

  chartOptions.endDate.setDate(15);
  let auxDate = new Date(chartOptions.startDate.getTime());

  while (auxDate.getTime() < chartOptions.endDate.getTime()) {
    months.push(mapToMonthColum(auxDate));

    const year = auxDate.getFullYear();

    groups.set(year, (groups.get(year) ?? 0) + 1);

    auxDate = new Date(auxDate.setMonth(auxDate.getMonth() + 1));
  }

  const values: ChartData["values"] = [];
  const dividendsByMonth: ChartData["dividendsByMonth"] = [];

  const today = new Date();

  const isOnlyUS = chartOptions.country === "US";

  months.forEach((monthYear) => {
    const filteredDividends = dividends
      .filter(
        (dividend) =>
          mapToMonthColum(dividend.paymentDate).key === monthYear.key
      )
      .map((dividend) => {
        let valueToFormat = Number(dividend.cashAmount);
        let countryToFormat: "BR" | "US" = "BR";

        if (dividend.country === "US") {
          if (isOnlyUS) {
            countryToFormat = "US";
          } else {
            const convertedCashAmount =
              Number(dividend.cashAmount) * Number(dividend.dollarRate);
            valueToFormat = convertedCashAmount;
          }
        }

        const formattedCashAmount = formatCurrency(
          valueToFormat,
          countryToFormat
        );

        return { ...dividend, formattedCashAmount };
      });

    let sum = 0;

    filteredDividends
      .map((dividend) => {
        if (dividend.country === "US") {
          return isOnlyUS
            ? dividend.cashAmount
            : Number(dividend.cashAmount) * Number(dividend.dollarRate);
        }
        return dividend.cashAmount;
      })
      .forEach((value) => {
        sum += Number(value);
      });

    const ignoreMonth =
      monthYear.date > today && filteredDividends.length === 0;
    if (!ignoreMonth) {
      filteredDividends.sort((a, b) => {
        return a.paymentDate.getTime() - b.paymentDate.getTime();
      });

      dividendsByMonth.push({
        month: monthYear.label,
        dividends: filteredDividends.reverse(),
      });
    }
    values.push({ x: monthYear.label, y: sum.toFixed(2) });
  });

  return { values, groups, dividendsByMonth: dividendsByMonth.reverse() };
}

export function getInitialChartOptions(): ChartOptions {
  const startDate = new Date(new Date().getFullYear(), 0, 1);
  const endDate = new Date(new Date().getFullYear(), 11, 31);
  return {
    startDate,
    endDate,
    startDateISO: formatDateToISO(startDate),
    endDateISO: formatDateToISO(endDate),
    country: "all",
  };
}
