import { ReactNode, useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import AuthModal from './AuthModal';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

const ProtectedRoute = ({
  children,
  redirectTo = '/discover',
}: ProtectedRouteProps) => {
  const { isAuthenticated, isInitialized } = useAuthStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      setIsAuthModalOpen(true);
    }
  }, [isInitialized, isAuthenticated]);
  
  // If auth is not initialized yet, render nothing
  if (!isInitialized) {
    return null;
  }
  
  // If user is authenticated, render the children
  if (isAuthenticated) {
    return <>{children}</>;
  }
  
  // If user closes the auth modal without logging in, redirect
  const handleCloseModal = () => {
    setIsAuthModalOpen(false);
    // Redirect will happen due to !isAuthenticated
  };
  
  // If user is not authenticated, show auth modal or redirect
  return (
    <>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleCloseModal}
        redirectUrl={location.pathname}
      />
      {!isAuthModalOpen && <Navigate to={redirectTo} replace />}
    </>
  );
};

export default ProtectedRoute;

