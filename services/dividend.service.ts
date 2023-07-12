import { Dividend } from '@/types/dividend.type';

export async function addDividend(dividend: Dividend) {
  const response = await fetch('/api/dividends', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(dividend),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'Something went wrong!');
  }

  return data;
}

export async function deleteDividend(dividendId: string) {
  const response = await fetch(`/api/dividends/${dividendId}`, {
    method: 'DELETE',
  });

  return response;
}
