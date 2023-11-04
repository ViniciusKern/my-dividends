import { Dividend } from "./dividend.type";

export type ChartOptions = {
  startDate: Date;
  endDate: Date;
  startDateISO: string;
  endDateISO: string;
  country: "all" | "BR" | "US";
};

export type ChartData = {
  values: Array<{ x: string; y: string }>;
  groups: Map<number, number>;
  dividendsByMonth: Array<{ month: string; dividends: Dividend[] }>;
};

export type MonthColumn = {
  key: string;
  label: string;
  date: Date;
};
