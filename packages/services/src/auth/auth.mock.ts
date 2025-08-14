import { BehaviorSubject, Observable } from 'rxjs';
import { createUserProfile, UserProfile } from '@travel-planner/domain';
import { AuthProvider, AuthService, AuthState } from './auth.interface';

/**
 * Mock implementation of the AuthService
 */
export class MockAuthService implements AuthService {
  private authStateSubject: BehaviorSubject<AuthState>;
  
  constructor() {
    // Initialize with a logged-out state
    this.authStateSubject = new BehaviorSubject<AuthState>({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      error: null,
    });
    
    // Check if we have a user in localStorage
    this.loadUserFromStorage();
  }
  
  /**
   * Current authentication state as an observable
   */
  get authState$(): Observable<AuthState> {
    return this.authStateSubject.asObservable();
  }
  
  /**
   * Sign in with a provider
   */
  async signInWithProvider(provider: AuthProvider): Promise<UserProfile> {
    // Set loading state
    this.authStateSubject.next({
      ...this.authStateSubject.value,
      isLoading: true,
    });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock user based on the provider
      const user = createUserProfile({
        name: provider === AuthProvider.GOOGLE ? 'Google User' : 'Facebook User',
        email: provider === AuthProvider.GOOGLE ? 'user@gmail.com' : 'user@facebook.com',
      });
      
      // Save user to localStorage
      localStorage.setItem('auth_user', JSON.stringify(user));
      
      // Update state
      this.authStateSubject.next({
        isAuthenticated: true,
        isLoading: false,
        user,
        error: null,
      });
      
      return user;
    } catch (error) {
      // Update error state
      this.authStateSubject.next({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: 'Failed to sign in',
      });
      
      throw error;
    }
  }
  
  /**
   * Sign out the current user
   */
  async signOut(): Promise<void> {
    // Set loading state
    this.authStateSubject.next({
      ...this.authStateSubject.value,
      isLoading: true,
    });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove user from localStorage
      localStorage.removeItem('auth_user');
      
      // Update state
      this.authStateSubject.next({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
      });
    } catch (error) {
      // Update error state
      this.authStateSubject.next({
        ...this.authStateSubject.value,
        isLoading: false,
        error: 'Failed to sign out',
      });
      
      throw error;
    }
  }
  
  /**
   * Get the current user
   */
  getCurrentUser(): UserProfile | null {
    return this.authStateSubject.value.user;
  }
  
  /**
   * Check if the user is authenticated
   */
  isAuthenticated(): boolean {
    return this.authStateSubject.value.isAuthenticated;
  }
  
  /**
   * Load user from localStorage
   */
  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('auth_user');
    
    if (userJson) {
      try {
        const user = JSON.parse(userJson) as UserProfile;
        
        this.authStateSubject.next({
          isAuthenticated: true,
          isLoading: false,
          user,
          error: null,
        });
      } catch (error) {
        // Invalid JSON, remove it
        localStorage.removeItem('auth_user');
      }
    }
  }
}

