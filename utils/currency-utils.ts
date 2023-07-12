export function formatCurrency(number: number, country: 'BR' | 'US' = 'BR') {
  const currencies = {
    ['BR']: 'BRL',
    ['US']: 'USD',
  };
  const options = {
    style: 'currency',
    currency: currencies[country],
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return number.toLocaleString('pt-BR', options);
}
