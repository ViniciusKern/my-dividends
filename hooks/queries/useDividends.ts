import { useQuery } from '@tanstack/react-query';
import { Dividend } from '@/types/dividend.type';
import { formatDateToISO } from '@/utils/date-utils';

type Props = {
  startDate?: Date;
  endDate?: Date;
  country?: 'all' | 'BR' | 'US';
};

export function useDividends({ country = 'all', startDate, endDate }: Props) {
  return useQuery<Dividend[]>({
    queryKey: ['dividendsList', country, startDate, endDate],
    queryFn: async () => {
      const start = startDate ? formatDateToISO(startDate) : '';
      const end = endDate ? formatDateToISO(endDate) : '';

      const response = await fetch(
        `/api/dividends?country=${country}&start_date=${start}&end_date=${end}`
      ).then(res => res.json());

      const dividends = response.data.dividends.map((item: Record<string, string>) => ({
        ...item,
        paymentDate: new Date(item.paymentDate),
      }));
      return dividends;
    },
  });
}
