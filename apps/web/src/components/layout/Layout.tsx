import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '@travel-app/ui-core';
import BottomNavigation from './BottomNavigation';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header - visible on all screen sizes */}
      <Header />
      
      <div className="flex">
        {/* Sidebar - only visible on desktop */}
        {isDesktop && <Sidebar />}
        
        {/* Main content */}
        <main className="flex-1 px-4 pb-20 pt-16 md:px-6 lg:pl-64 lg:pt-20">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Bottom navigation - only visible on mobile */}
      {!isDesktop && <BottomNavigation />}
    </div>
  );
};

export default Layout;

