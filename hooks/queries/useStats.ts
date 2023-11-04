import { useQuery } from "@tanstack/react-query";
import { DividendStat } from "@/types/stats.type";

export function useStats() {
  return useQuery<DividendStat[]>({
    queryKey: ["statistics"],
    queryFn: async () => {
      const response = await fetch("/api/dividends/stats").then((res) =>
        res.json()
      );
      return response.data;
    },
    staleTime: Infinity,
  });
}
