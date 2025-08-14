import React from 'react';

export interface CardProps {
  /**
   * Card content
   */
  children: React.ReactNode;
  
  /**
   * Optional card header
   */
  header?: React.ReactNode;
  
  /**
   * Optional card footer
   */
  footer?: React.ReactNode;
  
  /**
   * Optional card image
   */
  image?: {
    src: string;
    alt?: string;
  };
  
  /**
   * Is the card interactive (clickable)
   */
  interactive?: boolean;
  
  /**
   * Card elevation (shadow level)
   */
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Click handler for the card
   */
  onClick?: () => void;
}

/**
 * Card component for displaying content in a contained format
 */
export const Card: React.FC<CardProps> = ({
  children,
  header,
  footer,
  image,
  interactive = false,
  elevation = 'md',
  className = '',
  onClick,
}) => {
  // This is a headless component, so we don't apply any styles directly
  // The web implementation will apply the appropriate styles
  
  const CardComponent = interactive ? 'button' : 'div';
  
  return (
    <CardComponent
      data-card
      data-interactive={interactive}
      data-elevation={elevation}
      onClick={interactive ? onClick : undefined}
      type={interactive ? 'button' : undefined}
    >
      {image && (
        <div data-card-image>
          {/* Image will be implemented in the web version */}
          <img src={image.src} alt={image.alt || ''} />
        </div>
      )}
      
      {header && <div data-card-header>{header}</div>}
      
      <div data-card-content>{children}</div>
      
      {footer && <div data-card-footer>{footer}</div>}
    </CardComponent>
  );
};

