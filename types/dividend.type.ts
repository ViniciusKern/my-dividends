import { Stock } from './stock.types';

export type Dividend = {
  _id?: string;
  refUser?: string;
  refStock: string;
  stock?: Stock;
  country: string;
  currency?: string;
  dollarRate: string;
  paymentDate: Date;
  cashAmount: string;
  formattedCashAmount?: string;
};
