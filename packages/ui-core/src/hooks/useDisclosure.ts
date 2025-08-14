import { useState, useCallback } from 'react';

export interface UseDisclosureProps {
  /**
   * The default value of the disclosure
   */
  defaultIsOpen?: boolean;
  
  /**
   * Function called when the disclosure is opened
   */
  onOpen?: () => void;
  
  /**
   * Function called when the disclosure is closed
   */
  onClose?: () => void;
}

/**
 * Hook for controlling disclosure state (open/close)
 */
export function useDisclosure(props: UseDisclosureProps = {}) {
  const { defaultIsOpen = false, onOpen: onOpenProp, onClose: onCloseProp } = props;
  
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  
  const onOpen = useCallback(() => {
    setIsOpen(true);
    onOpenProp?.();
  }, [onOpenProp]);
  
  const onClose = useCallback(() => {
    setIsOpen(false);
    onCloseProp?.();
  }, [onCloseProp]);
  
  const onToggle = useCallback(() => {
    const action = isOpen ? onClose : onOpen;
    action();
  }, [isOpen, onOpen, onClose]);
  
  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
}

