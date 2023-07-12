import { useQuery } from '@tanstack/react-query';
import { Stock } from '@/types/stock.types';

export function useStocks() {
  return useQuery<Stock[]>({
    queryKey: ['stockList'],
    queryFn: async () => {
      const response = await fetch('/api/stocks').then(res => res.json());
      return response.data;
    },
  });
}
