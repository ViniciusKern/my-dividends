import { useQuery } from '@tanstack/react-query';

export function useDollarExchangeRate(originalDate: Date) {
  let date = new Date(originalDate.getTime());
  date = adjustDate(date);

  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  const formattedDate = `${month}-${day}-${year}`;

  return useQuery<number>({
    queryKey: ['dollarExchangeRate', formattedDate],
    queryFn: () =>
      fetch(
        `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${formattedDate}'&$top=100&$format=json&$select=cotacaoVenda`
      )
        .then(res => res.json())
        .then(res => res.value[0]?.cotacaoVenda ?? 5),
  });
}

function adjustDate(date: Date) {
  const currentDate = new Date();
  const dayOfWeek = date.getDay();

  if (date > currentDate) {
    date = currentDate;
  }

  // If the date is today, return the date for yesterday
  if (date.toDateString() === currentDate.toDateString()) {
    date.setDate(date.getDate() - 1);
  }
  // If the date is a Saturday or Sunday, return the date for the previous Friday
  if (dayOfWeek === 6) {
    date.setDate(date.getDate() - 1);
  } else if (dayOfWeek === 0) {
    date.setDate(date.getDate() - 2);
  }

  return date;
}
