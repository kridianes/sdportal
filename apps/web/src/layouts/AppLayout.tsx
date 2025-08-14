import { Outlet } from 'react-router-dom';
import { BottomNavigation } from '../components/navigation/BottomNavigation';
import { Header } from '../components/navigation/Header';

export const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container-app py-4 pb-20 md:pb-4">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

