export type StockCategory = {
  id: string;
  name: string;
  country: 'BR' | 'US';
  emoji: string;
};

export type Stock = {
  id: string;
  name: string;
  ticker: string;
  logo: string;
  category: StockCategory | undefined;
};
