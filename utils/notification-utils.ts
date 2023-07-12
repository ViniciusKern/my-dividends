import { notifications } from '@mantine/notifications';

export function showSuccess(message: string) {
  notifications.show({
    title: 'Sucesso!',
    message: message,
    color: 'green',
  });
}

export function showError(message: string) {
  notifications.show({
    title: 'Erro!',
    message: message,
    color: 'red',
  });
}
