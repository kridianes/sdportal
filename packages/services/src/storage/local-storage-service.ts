import { StorageService } from './types';

export class LocalStorageService implements StorageService {
  private prefix: string;
  
  constructor(prefix: string = 'travel-app-') {
    this.prefix = prefix;
  }
  
  private getFullKey(key: string): string {
    return `${this.prefix}${key}`;
  }
  
  get<T>(key: string): T | null {
    try {
      const fullKey = this.getFullKey(key);
      const value = localStorage.getItem(fullKey);
      
      if (value === null) {
        return null;
      }
      
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`Error getting item from localStorage: ${key}`, error);
      return null;
    }
  }
  
  set<T>(key: string, value: T): void {
    try {
      const fullKey = this.getFullKey(key);
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(fullKey, serializedValue);
    } catch (error) {
      console.error(`Error setting item in localStorage: ${key}`, error);
    }
  }
  
  remove(key: string): void {
    try {
      const fullKey = this.getFullKey(key);
      localStorage.removeItem(fullKey);
    } catch (error) {
      console.error(`Error removing item from localStorage: ${key}`, error);
    }
  }
  
  clear(): void {
    try {
      // Only clear items with our prefix
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.prefix)) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  }
}

