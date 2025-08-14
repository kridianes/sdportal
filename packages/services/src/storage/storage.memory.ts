import { StorageService } from './storage.interface';

/**
 * In-memory implementation of the StorageService
 */
export class MemoryStorageService implements StorageService {
  private storage: Map<string, string>;
  
  constructor() {
    this.storage = new Map<string, string>();
  }
  
  /**
   * Get an item from memory storage
   */
  async getItem<T>(key: string): Promise<T | null> {
    const value = this.storage.get(key);
    
    if (value === undefined) {
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
   * Set an item in memory storage
   */
  async setItem<T>(key: string, value: T): Promise<void> {
    const jsonValue = JSON.stringify(value);
    this.storage.set(key, jsonValue);
  }
  
  /**
   * Remove an item from memory storage
   */
  async removeItem(key: string): Promise<void> {
    this.storage.delete(key);
  }
  
  /**
   * Clear all items from memory storage
   */
  async clear(): Promise<void> {
    this.storage.clear();
  }
}

