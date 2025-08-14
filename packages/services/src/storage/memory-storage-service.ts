import { StorageService } from './types';

export class MemoryStorageService implements StorageService {
  private storage: Map<string, any> = new Map();
  
  get<T>(key: string): T | null {
    if (this.storage.has(key)) {
      return this.storage.get(key) as T;
    }
    return null;
  }
  
  set<T>(key: string, value: T): void {
    this.storage.set(key, value);
  }
  
  remove(key: string): void {
    this.storage.delete(key);
  }
  
  clear(): void {
    this.storage.clear();
  }
}

