import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { Toast, ToastProps } from '../components/Toast';

interface ToastContextProps {
  toast: (props: Omit<ToastProps, 'id' | 'onClose'>) => void;
  closeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
  
  const toast = useCallback((props: Omit<ToastProps, 'id' | 'onClose'>) => {
    const id = crypto.randomUUID();
    const newToast: ToastProps = {
      ...props,
      id,
      onClose: () => closeToast(id),
    };
    
    setToasts((prevToasts) => [...prevToasts, newToast]);
    
    // Auto-close toast after duration
    if (props.duration !== Infinity) {
      setTimeout(() => {
        closeToast(id);
      }, props.duration || 5000);
    }
  }, []);
  
  const closeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);
  
  return (
    <ToastContext.Provider value={{ toast, closeToast }}>
      {children}
      
      {/* Toast container */}
      <div className="fixed bottom-0 right-0 z-50 m-4 flex flex-col items-end space-y-2">
        {toasts.map((toastProps) => (
          <Toast key={toastProps.id} {...toastProps} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

