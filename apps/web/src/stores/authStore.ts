import { create } from 'zustand';
import { UserProfile } from '@travel-app/domain';
import { AuthService, MockAuthService, LocalStorageService } from '@travel-app/services';

// Initialize services
const storageService = new LocalStorageService('travel-app-');
const authService = new MockAuthService(storageService);

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (provider: string) => Promise<UserProfile>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<UserProfile>) => Promise<UserProfile>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  isLoading: false,
  error: null,
  
  login: async (provider: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const user = await authService.login(provider);
      set({ user, isAuthenticated: true, isLoading: false });
      return user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to login';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },
  
  logout: async () => {
    set({ isLoading: true, error: null });
    
    try {
      await authService.logout();
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to logout';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },
  
  updateProfile: async (userData: Partial<UserProfile>) => {
    set({ isLoading: true, error: null });
    
    try {
      const updatedUser = await authService.updateProfile(userData);
      set({ user: updatedUser, isLoading: false });
      return updatedUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },
}));

// Initialize auth state from storage
authService.onAuthStateChanged((user) => {
  useAuthStore.setState({
    user,
    isAuthenticated: !!user,
    isInitialized: true,
  });
});

