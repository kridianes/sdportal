import { StorageService } from './storage.interface';

/**
 * Local storage implementation of the StorageService
 */
export class LocalStorageService implements StorageService {
  private readonly prefix: string;
  
  constructor(prefix: string = 'travel-planner') {
    this.prefix = prefix;
  }
  
  /**
   * Get an item from local storage
   */
  async getItem<T>(key: string): Promise<T | null> {
    const prefixedKey = this.getPrefixedKey(key);
    const value = localStorage.getItem(prefixedKey);
    
    if (value === null) {
      return null;
    }
    
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`Error parsing JSON for key ${key}:`, error);
      return null;
    }
  }
  
  /**
   * Set an item in local storage
   */
  async setItem<T>(key: string, value: T): Promise<void> {
    const prefixedKey = this.getPrefixedKey(key);
    const jsonValue = JSON.stringify(value);
    
    localStorage.setItem(prefixedKey, jsonValue);
  }
  
  /**
   * Remove an item from local storage
   */
  async removeItem(key: string): Promise<void> {
    const prefixedKey = this.getPrefixedKey(key);
    localStorage.removeItem(prefixedKey);
  }
  
  /**
   * Clear all items from local storage with our prefix
   */
  async clear(): Promise<void> {
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      if (key && key.startsWith(this.prefix)) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }
  
  /**
   * Get a prefixed key
   */
  private getPrefixedKey(key: string): string {
    return `${this.prefix}:${key}`;
  }
}

