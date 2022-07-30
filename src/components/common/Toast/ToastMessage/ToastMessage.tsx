import { useEffect } from 'react';

import { Toast } from '../toast.types';
import { Container } from './styles';

type Props = {
  toast: Toast;
  onRemove: (id: number) => void;
};

export default function ToastMessage({ toast, onRemove }: Props) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemove(toast.id);
    }, toast.durationInMilliseconds ?? 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  });

  function handleRemoveToast() {
    onRemove(toast.id);
  }

  return (
    <Container type={toast.type} onClick={handleRemoveToast} tabIndex={0} role='button'>
      <strong>{toast.text}</strong>
    </Container>
  );
}
