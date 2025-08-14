import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant
   */
  variant?: ButtonVariant;
  
  /**
   * Button size
   */
  size?: ButtonSize;
  
  /**
   * Full width button
   */
  fullWidth?: boolean;
  
  /**
   * Icon to display before the button text
   */
  startIcon?: React.ReactNode;
  
  /**
   * Icon to display after the button text
   */
  endIcon?: React.ReactNode;
  
  /**
   * Is the button in a loading state
   */
  isLoading?: boolean;
  
  /**
   * Loading text to display
   */
  loadingText?: string;
}

/**
 * Primary UI component for user interaction
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      startIcon,
      endIcon,
      isLoading = false,
      loadingText,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    // This is a headless component, so we don't apply any styles directly
    // The web implementation will apply the appropriate styles
    
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        data-variant={variant}
        data-size={size}
        data-full-width={fullWidth}
        data-loading={isLoading}
        {...props}
      >
        {isLoading && (
          <span data-loading-indicator>
            {/* Loading indicator will be implemented in the web version */}
          </span>
        )}
        
        {!isLoading && startIcon && <span data-start-icon>{startIcon}</span>}
        
        <span data-button-text>
          {isLoading && loadingText ? loadingText : children}
        </span>
        
        {!isLoading && endIcon && <span data-end-icon>{endIcon}</span>}
      </button>
    );
  }
);

