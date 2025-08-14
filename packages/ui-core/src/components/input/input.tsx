import React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Input label
   */
  label?: string;
  
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Input size
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Icon to display at the start of the input
   */
  startIcon?: React.ReactNode;
  
  /**
   * Icon to display at the end of the input
   */
  endIcon?: React.ReactNode;
  
  /**
   * Full width input
   */
  fullWidth?: boolean;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Input component for collecting user input
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      startIcon,
      endIcon,
      fullWidth = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if one is not provided
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    
    // This is a headless component, so we don't apply any styles directly
    // The web implementation will apply the appropriate styles
    
    return (
      <div
        data-input-container
        data-size={size}
        data-full-width={fullWidth}
        data-has-error={!!error}
      >
        {label && (
          <label data-input-label htmlFor={inputId}>
            {label}
          </label>
        )}
        
        <div data-input-wrapper>
          {startIcon && <div data-start-icon>{startIcon}</div>}
          
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper-text`
                : undefined
            }
            {...props}
          />
          
          {endIcon && <div data-end-icon>{endIcon}</div>}
        </div>
        
        {error && (
          <div data-error-text id={`${inputId}-error`} role="alert">
            {error}
          </div>
        )}
        
        {!error && helperText && (
          <div data-helper-text id={`${inputId}-helper-text`}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

