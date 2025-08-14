export interface StorageService {
  /**
   * Get a value from storage
   * @param key The key to retrieve
   * @returns The value or null if not found
   */
  get<T>(key: string): T | null;
  
  /**
   * Set a value in storage
   * @param key The key to store
   * @param value The value to store
   */
  set<T>(key: string, value: T): void;
  
  /**
   * Remove a value from storage
   * @param key The key to remove
   */
  remove(key: string): void;
  
  /**
   * Clear all values from storage
   */
  clear(): void;
}

