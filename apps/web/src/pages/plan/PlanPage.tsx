import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Trip } from '@travel-app/domain';
import { TripsService, MockTripsService, StorageService, LocalStorageService, GuidesService, MockGuidesService } from '@travel-app/services';
import { Button } from '@travel-app/ui-core';
import { useAuthStore } from '@/stores/authStore';
import LoadingScreen from '@/components/common/LoadingScreen';
import TripCard from '@/components/plan/TripCard';

const PlanPage = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  
  // Initialize services
  const storageService = new LocalStorageService('travel-app-');
  const guidesService = new MockGuidesService();
  const tripsService = new MockTripsService(storageService, guidesService, user?.id || '');
  
  useEffect(() => {
    const fetchTrips = async () => {
      setIsLoading(true);
      
      try {
        let fetchedTrips: Trip[];
        
        if (activeFilter === 'all') {
          fetchedTrips = await tripsService.list();
        } else if (activeFilter === 'upcoming') {
          fetchedTrips = await tripsService.search({ upcoming: true });
        } else {
          fetchedTrips = await tripsService.search({ past: true });
        }
        
        setTrips(fetchedTrips);
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTrips();
  }, [activeFilter, tripsService]);
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <div className="py-6">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            {t('plan.my_trips')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('plan.manage_your_trips')}
          </p>
        </div>
        
        <Link to="/plan/new">
          <Button variant="primary" leftIcon={
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          }>
            {t('plan.create_trip')}
          </Button>
        </Link>
      </div>
      
      {/* Filters */}
      <div className="mb-6 flex border-b border-gray-200 dark:border-gray-700">
        <button
          type="button"
          className={`mr-4 pb-4 text-sm font-medium ${
            activeFilter === 'all'
              ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
              : 'text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveFilter('all')}
        >
          {t('plan.all_trips')}
        </button>
        <button
          type="button"
          className={`mr-4 pb-4 text-sm font-medium ${
            activeFilter === 'upcoming'
              ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
              : 'text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveFilter('upcoming')}
        >
          {t('plan.upcoming')}
        </button>
        <button
          type="button"
          className={`mr-4 pb-4 text-sm font-medium ${
            activeFilter === 'past'
              ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
              : 'text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveFilter('past')}
        >
          {t('plan.past')}
        </button>
      </div>
      
      {/* Trips grid */}
      {trips.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 rounded-full bg-gray-100 p-3 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
            {t('plan.no_trips_found')}
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            {activeFilter === 'all'
              ? t('plan.no_trips_yet')
              : activeFilter === 'upcoming'
              ? t('plan.no_upcoming_trips')
              : t('plan.no_past_trips')}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/plan/new">
              <Button variant="primary">
                {t('plan.create_trip')}
              </Button>
            </Link>
            <Link to="/discover">
              <Button variant="outline">
                {t('plan.browse_guides')}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanPage;

