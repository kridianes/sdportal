import React, { useEffect } from 'react';

export interface ModalProps {
  /**
   * Modal content
   */
  children: React.ReactNode;
  
  /**
   * Is the modal open
   */
  isOpen: boolean;
  
  /**
   * Callback when the modal is closed
   */
  onClose: () => void;
  
  /**
   * Modal title
   */
  title?: React.ReactNode;
  
  /**
   * Modal size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  
  /**
   * Should the modal close when clicking outside
   */
  closeOnOverlayClick?: boolean;
  
  /**
   * Should the modal close when pressing escape
   */
  closeOnEsc?: boolean;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Modal component for displaying content in a layer above the app
 */
export const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className = '',
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (closeOnEsc && isOpen && event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose, closeOnEsc]);
  
  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      // Lock body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = '';
    }
    
    return () => {
      // Cleanup
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  if (!isOpen) {
    return null;
  }
  
  // This is a headless component, so we don't apply any styles directly
  // The web implementation will apply the appropriate styles
  
  return (
    <div
      data-modal-overlay
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        data-modal-content
        data-size={size}
        onClick={e => e.stopPropagation()}
      >
        <div data-modal-header>
          {title && (
            <h2 id="modal-title" data-modal-title>
              {title}
            </h2>
          )}
          
          <button
            data-modal-close
            aria-label="Close modal"
            onClick={onClose}
            type="button"
          >
            {/* Close icon will be implemented in the web version */}
          </button>
        </div>
        
        <div data-modal-body>{children}</div>
      </div>
    </div>
  );
};

