import React, { createContext, useContext, ReactNode } from 'react';
import { Toast, ToastContainer } from '../components/toast';
import { useToast } from '../hooks/useToast';

// Create context
const ToastContext = createContext<ReturnType<typeof useToast> | undefined>(
  undefined
);

export interface ToastProviderProps {
  /**
   * Children components
   */
  children: ReactNode;
  
  /**
   * Toast container position
   */
  position?: React.ComponentProps<typeof ToastContainer>['position'];
}

/**
 * Provider component for toast notifications
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'bottom-right',
}) => {
  const toastHelpers = useToast();
  
  return (
    <ToastContext.Provider value={toastHelpers}>
      {children}
      <ToastContainer position={position}>
        {toastHelpers.toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            variant={toast.variant}
            duration={toast.duration}
            onClose={() => toastHelpers.removeToast(toast.id)}
          />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

/**
 * Hook to use toast context
 */
export const useToastContext = () => {
  const context = useContext(ToastContext);
  
  if (context === undefined) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  
  return context;
};

