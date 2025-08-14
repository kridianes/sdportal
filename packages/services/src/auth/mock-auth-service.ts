import { UserProfile, createUserProfile } from '@travel-app/domain';
import { AuthService, AuthChangeCallback } from './types';
import { StorageService } from '../storage';

const AUTH_STORAGE_KEY = 'travel-app-auth';
const TOKEN_STORAGE_KEY = 'travel-app-token';

export class MockAuthService implements AuthService {
  private currentUser: UserProfile | null = null;
  private listeners: AuthChangeCallback[] = [];
  private storageService: StorageService;
  
  constructor(storageService: StorageService) {
    this.storageService = storageService;
    this.initFromStorage();
  }
  
  private initFromStorage(): void {
    // Try to get user from storage
    const userData = this.storageService.get<UserProfile>(AUTH_STORAGE_KEY);
    if (userData) {
      this.currentUser = userData;
    }
  }
  
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.currentUser));
  }
  
  private saveToStorage(): void {
    if (this.currentUser) {
      this.storageService.set(AUTH_STORAGE_KEY, this.currentUser);
      // Save a mock token
      this.storageService.set(TOKEN_STORAGE_KEY, {
        token: `mock-token-${Date.now()}`,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      });
    } else {
      this.storageService.remove(AUTH_STORAGE_KEY);
      this.storageService.remove(TOKEN_STORAGE_KEY);
    }
  }
  
  async login(provider: string): Promise<UserProfile> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a mock user based on the provider
    const userId = `user-${Date.now()}`;
    let user: UserProfile;
    
    if (provider === 'google') {
      user = createUserProfile(
        userId,
        'user@example.com',
        'Google User',
        'https://ui-avatars.com/api/?name=Google+User&background=0D8ABC&color=fff'
      );
    } else if (provider === 'facebook') {
      user = createUserProfile(
        userId,
        'fb-user@example.com',
        'Facebook User',
        'https://ui-avatars.com/api/?name=Facebook+User&background=3b5998&color=fff'
      );
    } else {
      throw new Error(`Unsupported provider: ${provider}`);
    }
    
    this.currentUser = user;
    this.saveToStorage();
    this.notifyListeners();
    
    return user;
  }
  
  async logout(): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.currentUser = null;
    this.saveToStorage();
    this.notifyListeners();
  }
  
  async getCurrentUser(): Promise<UserProfile | null> {
    return this.currentUser;
  }
  
  async updateProfile(userData: Partial<UserProfile>): Promise<UserProfile> {
    if (!this.currentUser) {
      throw new Error('No user is currently logged in');
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Update user data
    this.currentUser = {
      ...this.currentUser,
      ...userData,
      // Don't allow overriding id or email
      id: this.currentUser.id,
      email: this.currentUser.email,
    };
    
    this.saveToStorage();
    this.notifyListeners();
    
    return this.currentUser;
  }
  
  onAuthStateChanged(callback: AuthChangeCallback): () => void {
    this.listeners.push(callback);
    
    // Call the callback immediately with the current state
    callback(this.currentUser);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }
}

