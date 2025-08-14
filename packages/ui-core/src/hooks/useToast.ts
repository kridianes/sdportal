import { useCallback, useState } from 'react';
import { ToastVariant } from '../components/toast';

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}

export interface ToastOptions {
  /**
   * Toast duration in milliseconds
   */
  duration?: number;
  
  /**
   * Toast variant
   */
  variant?: ToastVariant;
}

/**
 * Hook for managing toast notifications
 */
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const addToast = useCallback(
    (message: string, options: ToastOptions = {}) => {
      const { duration = 5000, variant = 'info' } = options;
      
      const id = Math.random().toString(36).substring(2, 9);
      
      const toast: Toast = {
        id,
        message,
        variant,
        duration,
      };
      
      setToasts(prevToasts => [...prevToasts, toast]);
      
      return id;
    },
    []
  );
  
  const removeToast = useCallback((id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);
  
  const updateToast = useCallback(
    (id: string, message: string, options: ToastOptions = {}) => {
      setToasts(prevToasts =>
        prevToasts.map(toast => {
          if (toast.id === id) {
            return {
              ...toast,
              message,
              ...options,
            };
          }
          return toast;
        })
      );
    },
    []
  );
  
  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);
  
  // Convenience methods for different toast variants
  const success = useCallback(
    (message: string, options: Omit<ToastOptions, 'variant'> = {}) => {
      return addToast(message, { ...options, variant: 'success' });
    },
    [addToast]
  );
  
  const error = useCallback(
    (message: string, options: Omit<ToastOptions, 'variant'> = {}) => {
      return addToast(message, { ...options, variant: 'error' });
    },
    [addToast]
  );
  
  const warning = useCallback(
    (message: string, options: Omit<ToastOptions, 'variant'> = {}) => {
      return addToast(message, { ...options, variant: 'warning' });
    },
    [addToast]
  );
  
  const info = useCallback(
    (message: string, options: Omit<ToastOptions, 'variant'> = {}) => {
      return addToast(message, { ...options, variant: 'info' });
    },
    [addToast]
  );
  
  return {
    toasts,
    addToast,
    removeToast,
    updateToast,
    clearToasts,
    success,
    error,
    warning,
    info,
  };
}

