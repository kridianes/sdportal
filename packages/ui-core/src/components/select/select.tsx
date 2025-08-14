import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * Select options
   */
  options: SelectOption[];
  
  /**
   * Select label
   */
  label?: string;
  
  /**
   * Helper text to display below the select
   */
  helperText?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Select size
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Full width select
   */
  fullWidth?: boolean;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Select component for selecting from a list of options
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      label,
      helperText,
      error,
      size = 'md',
      fullWidth = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    // Generate a unique ID if one is not provided
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
    
    // This is a headless component, so we don't apply any styles directly
    // The web implementation will apply the appropriate styles
    
    return (
      <div
        data-select-container
        data-size={size}
        data-full-width={fullWidth}
        data-has-error={!!error}
      >
        {label && (
          <label data-select-label htmlFor={selectId}>
            {label}
          </label>
        )}
        
        <div data-select-wrapper>
          <select
            ref={ref}
            id={selectId}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${selectId}-error`
                : helperText
                ? `${selectId}-helper-text`
                : undefined
            }
            {...props}
          >
            {options.map(option => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          
          <div data-select-icon>
            {/* Dropdown icon will be implemented in the web version */}
          </div>
        </div>
        
        {error && (
          <div data-error-text id={`${selectId}-error`} role="alert">
            {error}
          </div>
        )}
        
        {!error && helperText && (
          <div data-helper-text id={`${selectId}-helper-text`}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

