import { Toast, ToastListener, ToastType } from './toast.types';

class ToastManager {
  private listeners: ToastListener[] = [];

  public addListener(listener: ToastListener) {
    this.listeners.push(listener);
  }

  public removeListener(listenerToRemove: ToastListener) {
    this.listeners = this.listeners.filter(listener => listener !== listenerToRemove);
  }

  public addMessage(text: string, durationInMilliseconds?: number) {
    this.emit(text, 'default', durationInMilliseconds);
  }

  public addSuccess(text: string, durationInMilliseconds?: number) {
    this.emit(text, 'success', durationInMilliseconds);
  }

  public addError(text: string, durationInMilliseconds?: number) {
    this.emit(text, 'error', durationInMilliseconds);
  }

  private emit(text: string, type: ToastType, durationInMilliseconds?: number) {
    if (!text || !text.trim().length) return;

    const payload: Toast = {
      id: Math.random(),
      text,
      type,
      durationInMilliseconds,
    };

    this.listeners.forEach(listener => {
      listener(payload);
    });
  }
}

export default new ToastManager();
