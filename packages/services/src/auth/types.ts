import { UserProfile } from '@travel-app/domain';

export type AuthChangeCallback = (user: UserProfile | null) => void;

export interface AuthService {
  /**
   * Login with a specific provider
   * @param provider The authentication provider (e.g., 'google', 'facebook')
   * @returns A promise that resolves to the user profile
   */
  login(provider: string): Promise<UserProfile>;
  
  /**
   * Logout the current user
   * @returns A promise that resolves when logout is complete
   */
  logout(): Promise<void>;
  
  /**
   * Get the current user profile
   * @returns A promise that resolves to the user profile or null if not authenticated
   */
  getCurrentUser(): Promise<UserProfile | null>;
  
  /**
   * Update the user profile
   * @param userData Partial user profile data to update
   * @returns A promise that resolves to the updated user profile
   */
  updateProfile(userData: Partial<UserProfile>): Promise<UserProfile>;
  
  /**
   * Subscribe to authentication state changes
   * @param callback Function to call when auth state changes
   * @returns A function to unsubscribe
   */
  onAuthStateChanged(callback: AuthChangeCallback): () => void;
}

