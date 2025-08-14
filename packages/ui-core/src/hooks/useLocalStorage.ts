import { useState, useEffect } from 'react';

/**
 * Hook for using localStorage with React state
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: {
    /**
     * Prefix for the localStorage key
     */
    prefix?: string;
    
    /**
     * Serialize function
     */
    serialize?: (value: T) => string;
    
    /**
     * Deserialize function
     */
    deserialize?: (value: string) => T;
  } = {}
): [T, (value: T | ((val: T) => T)) => void] {
  const {
    prefix = 'app',
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  } = options;
  
  // Prefix the key
  const prefixedKey = `${prefix}:${key}`;
  
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(prefixedKey);
      
      // Parse stored json or if none return initialValue
      return item ? deserialize(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(`Error reading localStorage key "${prefixedKey}":`, error);
      return initialValue;
    }
  });
  
  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(prefixedKey, serialize(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(`Error setting localStorage key "${prefixedKey}":`, error);
    }
  };
  
  // Listen for changes to this localStorage key from other tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === prefixedKey && event.newValue) {
        try {
          setStoredValue(deserialize(event.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage change for key "${prefixedKey}":`, error);
        }
      }
    };
    
    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [prefixedKey, deserialize]);
  
  return [storedValue, setValue];
}

