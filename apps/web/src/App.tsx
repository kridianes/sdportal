import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from '@travel-app/ui-core';
import AppLayout from '@/components/layout/AppLayout';
import LoadingScreen from '@/components/common/LoadingScreen';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Lazy-loaded pages
const DiscoverPage = lazy(() => import('@/pages/discover/DiscoverPage'));
const GuidePage = lazy(() => import('@/pages/discover/GuidePage'));
const PlanPage = lazy(() => import('@/pages/plan/PlanPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              {/* Redirect root to discover */}
              <Route path="/" element={<Navigate to="/discover" replace />} />
              
              {/* Public routes */}
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/guides/:guideId" element={<GuidePage />} />
              
              {/* Protected routes */}
              <Route
                path="/plan"
                element={
                  <ProtectedRoute>
                    <PlanPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/plan/:tripId/edit"
                element={
                  <ProtectedRoute>
                    <div>Trip Edit Page (Coming Soon)</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/plan/new"
                element={
                  <ProtectedRoute>
                    <div>New Trip Page (Coming Soon)</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/experience"
                element={
                  <ProtectedRoute>
                    <div>Experience Page (Coming Soon)</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trip/:tripId/today"
                element={
                  <ProtectedRoute>
                    <div>Today View (Coming Soon)</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/memories"
                element={
                  <ProtectedRoute>
                    <div>Memories Page (Coming Soon)</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/memories/:tripId"
                element={
                  <ProtectedRoute>
                    <div>Trip Memories (Coming Soon)</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <div>Profile Page (Coming Soon)</div>
                  </ProtectedRoute>
                }
              />
              
              {/* 404 route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </AppLayout>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;

