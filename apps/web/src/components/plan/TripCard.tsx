import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Trip, isTripInProgress, isTripPast, isTripUpcoming } from '@travel-app/domain';
import { format } from 'date-fns';

interface TripCardProps {
  trip: Trip;
}

const TripCard = ({ trip }: TripCardProps) => {
  const { t } = useTranslation();
  
  const getTripStatus = () => {
    if (isTripInProgress(trip)) {
      return {
        label: t('plan.in_progress'),
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      };
    } else if (isTripUpcoming(trip)) {
      return {
        label: t('plan.upcoming'),
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      };
    } else if (isTripPast(trip)) {
      return {
        label: t('plan.past'),
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
      };
    }
    
    return {
      label: t('plan.draft'),
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    };
  };
  
  const status = getTripStatus();
  
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <Link to={`/plan/${trip.id}/edit`} className="block">
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {trip.title}
            </h3>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${status.color}`}
            >
              {status.label}
            </span>
          </div>
          
          <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
            {trip.destination} • {trip.days} {t('common.days')}
          </p>
          
          {trip.startDate && (
            <p className="mb-4 flex items-center text-sm text-gray-600 dark:text-gray-300">
              <svg
                className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {format(new Date(trip.startDate), 'MMM d, yyyy')}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg
                className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {trip.visibility === 'private'
                  ? t('common.private')
                  : trip.visibility === 'public'
                  ? t('common.public')
                  : t('common.friends')}
              </span>
            </div>
            
            <div className="flex items-center">
              <svg
                className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {trip.plan.reduce((total, day) => total + day.items.length, 0)}{' '}
                {t('plan.activities')}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TripCard;

