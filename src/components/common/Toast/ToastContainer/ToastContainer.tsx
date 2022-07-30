import { useCallback, useEffect, useState } from 'react';

import { Toast } from '../toast.types';
import ToastManager from '../ToastManager';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    function handleAddToast(toast: Toast) {
      setToasts(prevState => [...prevState, toast]);
    }

    ToastManager.addListener(handleAddToast);

    return () => {
      ToastManager.removeListener(handleAddToast);
    };
  }, []);

  const handleRemoveToast = useCallback((id: number) => {
    setToasts(prevState => prevState.filter(toast => toast.id !== id));
  }, []);

  return (
    <Container>
      {toasts.map(toast => (
        <ToastMessage key={toast.id} toast={toast} onRemove={handleRemoveToast} />
      ))}
    </Container>
  );
}
