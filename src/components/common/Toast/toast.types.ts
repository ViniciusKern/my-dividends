export type ToastType = 'default' | 'success' | 'error';

export type Toast = {
  id: number;
  text: string;
  type: ToastType;
  durationInMilliseconds?: number;
};

export type ToastListener = (payload: Toast) => void;
