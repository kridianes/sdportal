import { ReactNode, useEffect, useState } from 'react';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps {
  id: string;
  type?: ToastType;
  title?: string;
  message: string;
  duration?: number;
  onClose: () => void;
  icon?: ReactNode;
}

export const Toast = ({
  id,
  type = 'info',
  title,
  message,
  onClose,
  icon,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger enter animation
    const enterTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    
    return () => {
      clearTimeout(enterTimeout);
    };
  }, []);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match transition duration
  };
  
  const typeClasses = {
    info: 'bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    success: 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100',
    warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    error: 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100',
  };
  
  const iconClasses = {
    info: 'text-blue-500 dark:text-blue-400',
    success: 'text-green-500 dark:text-green-400',
    warning: 'text-yellow-500 dark:text-yellow-400',
    error: 'text-red-500 dark:text-red-400',
  };
  
  const defaultIcons = {
    info: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    success: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    warning: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    error: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };
  
  return (
    <div
      className={`transform rounded-lg shadow-lg transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      role="alert"
      aria-live="assertive"
    >
      <div
        className={`flex items-start rounded-lg p-4 ${typeClasses[type]}`}
      >
        <div className={`flex-shrink-0 ${iconClasses[type]}`}>
          {icon || defaultIcons[type]}
        </div>
        <div className="ml-3">
          {title && (
            <h3 className="text-sm font-medium">{title}</h3>
          )}
          <div className="mt-1 text-sm">{message}</div>
        </div>
        <div className="ml-4 flex flex-shrink-0">
          <button
            type="button"
            className={`inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              type === 'info'
                ? 'focus:ring-blue-500'
                : type === 'success'
                ? 'focus:ring-green-500'
                : type === 'warning'
                ? 'focus:ring-yellow-500'
                : 'focus:ring-red-500'
            }`}
            onClick={handleClose}
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

