import { Observable } from 'rxjs';
import { UserProfile } from '@travel-planner/domain';

export enum AuthProvider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  error: string | null;
}

export interface AuthService {
  /**
   * Current authentication state as an observable
   */
  authState$: Observable<AuthState>;
  
  /**
   * Sign in with a provider
   */
  signInWithProvider(provider: AuthProvider): Promise<UserProfile>;
  
  /**
   * Sign out the current user
   */
  signOut(): Promise<void>;
  
  /**
   * Get the current user
   */
  getCurrentUser(): UserProfile | null;
  
  /**
   * Check if the user is authenticated
   */
  isAuthenticated(): boolean;
}

