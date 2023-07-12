import { useQuery } from '@tanstack/react-query';
import { Stats } from '@/types/stats.type';

export function useStats() {
  return useQuery<Stats>({
    queryKey: ['statistics'],
    queryFn: async () => {
      const response = await fetch('/api/dividends/stats').then(res => res.json());
      return response.data;
    },
  });
}
