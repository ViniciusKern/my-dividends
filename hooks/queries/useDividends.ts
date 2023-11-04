import { useQuery } from "@tanstack/react-query";
import { Dividend } from "@/types/dividend.type";

type Props = {
  startDate?: string;
  endDate?: string;
  country?: "all" | "BR" | "US";
};

export function useDividends({ country = "all", startDate, endDate }: Props) {
  return useQuery<Dividend[]>({
    queryKey: ["dividendsList", country, startDate, endDate],
    queryFn: async () => {
      const response = await fetch(
        `/api/dividends?country=${country}&start_date=${startDate}&end_date=${endDate}`
      ).then((res) => res.json());

      const dividends = response.data.dividends.map(
        (item: Record<string, string>) => ({
          ...item,
          paymentDate: new Date(item.paymentDate),
        })
      );
      return dividends;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });
}
