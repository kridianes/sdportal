import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
  label?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, rightIcon, error, label, helperText, className = '', ...props }, ref) => {
    const baseClasses = 'block w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm';
    
    const stateClasses = error
      ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white';
    
    const iconClasses = leftIcon || rightIcon
      ? 'pl-10'
      : '';
    
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        
        <div className="relative rounded-md shadow-sm">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-500">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`${baseClasses} ${stateClasses} ${iconClasses} ${className}`}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
            {...props}
          />
          
          {rightIcon && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 dark:text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400" id={`${props.id}-error`}>
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400" id={`${props.id}-helper`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

