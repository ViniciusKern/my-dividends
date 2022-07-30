import { useEffect, useState } from 'react';

export default function useFetch<T>(promise: Promise<T>) {
  const [data, setData] = useState<T>();
  const [status, setStatus] = useState<'loading' | 'fetched' | 'error'>('loading');

  useEffect(() => {
    async function runPromise() {
      try {
        const result = await promise;
        setData(result);
        setStatus('fetched');
      } catch {
        setStatus('error');
      }
    }

    runPromise();
  }, [promise]);

  return { data, setData, status };
}
