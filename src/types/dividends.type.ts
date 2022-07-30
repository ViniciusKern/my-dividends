import { Stock } from './stocks.types';

export type Dividend = {
  id: string;
  stock: Stock | undefined;
  paymentDate: Date;
  cashAmount: string;
  currency: string;
};
