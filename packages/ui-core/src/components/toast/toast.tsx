import React, { useEffect, useState } from 'react';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps {
  /**
   * Toast message
   */
  message: string;
  
  /**
   * Toast variant
   */
  variant?: ToastVariant;
  
  /**
   * Toast duration in milliseconds
   */
  duration?: number;
  
  /**
   * Callback when the toast is closed
   */
  onClose?: () => void;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Toast component for displaying temporary messages
 */
export const Toast: React.FC<ToastProps> = ({
  message,
  variant = 'info',
  duration = 5000,
  onClose,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (duration === Infinity) return;
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);
    
    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);
  
  if (!isVisible) {
    return null;
  }
  
  // This is a headless component, so we don't apply any styles directly
  // The web implementation will apply the appropriate styles
  
  return (
    <div
      data-toast
      data-variant={variant}
      role="alert"
      aria-live="assertive"
    >
      <div data-toast-content>
        <div data-toast-icon>
          {/* Icon will be implemented in the web version */}
        </div>
        
        <div data-toast-message>{message}</div>
        
        <button
          data-toast-close
          aria-label="Close toast"
          onClick={() => {
            setIsVisible(false);
            onClose?.();
          }}
          type="button"
        >
          {/* Close icon will be implemented in the web version */}
        </button>
      </div>
    </div>
  );
};

// Toast container component
export interface ToastContainerProps {
  /**
   * Toast container position
   */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  
  /**
   * Toast container children
   */
  children: React.ReactNode;
}

/**
 * Container for toast components
 */
export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'bottom-right',
  children,
}) => {
  return (
    <div data-toast-container data-position={position}>
      {children}
    </div>
  );
};

