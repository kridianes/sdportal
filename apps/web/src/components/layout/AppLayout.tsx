import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import Sidebar from './Sidebar';
import { useAuthStore } from '@/stores/authStore';
import LoadingScreen from '../common/LoadingScreen';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const { isInitialized } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  // Show loading screen while auth is initializing
  if (!isInitialized) {
    return <LoadingScreen />;
  }
  
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        {/* Main content */}
        <main className="flex-1 px-4 pb-20 md:px-6 md:pb-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
      
      {/* Bottom navigation for mobile */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default AppLayout;

