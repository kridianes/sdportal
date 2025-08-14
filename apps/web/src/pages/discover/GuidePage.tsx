import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Guide } from '@travel-app/domain';
import { GuidesService, MockGuidesService, TripsService, MockTripsService, StorageService, LocalStorageService } from '@travel-app/services';
import { Button } from '@travel-app/ui-core';
import { useAuthStore } from '@/stores/authStore';
import AuthModal from '@/components/auth/AuthModal';
import LoadingScreen from '@/components/common/LoadingScreen';
import { useToastContext } from '@travel-app/ui-core';

const GuidePage = () => {
  const { t } = useTranslation();
  const { guideId } = useParams<{ guideId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { toast } = useToastContext();
  
  const [guide, setGuide] = useState<Guide | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  
  // Initialize services
  const guidesService = new MockGuidesService();
  const storageService = new LocalStorageService('travel-app-');
  const tripsService = user
    ? new MockTripsService(storageService, guidesService, user.id)
    : null;
  
  useEffect(() => {
    const fetchGuide = async () => {
      if (!guideId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const guideData = await guidesService.getById(guideId);
        
        if (!guideData) {
          setError(t('errors.guide_not_found'));
          return;
        }
        
        setGuide(guideData);
      } catch (error) {
        console.error('Error fetching guide:', error);
        setError(t('errors.failed_to_load'));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGuide();
  }, [guideId, t]);
  
  const handleCopyGuide = async () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    
    if (!guide || !tripsService) return;
    
    setIsCopying(true);
    
    try {
      const trip = await tripsService.copyFromGuide(guide.id);
      
      toast({
        type: 'success',
        message: t('discover.guide_copied'),
      });
      
      // Navigate to the trip edit page
      navigate(`/plan/${trip.id}/edit`);
    } catch (error) {
      console.error('Error copying guide:', error);
      toast({
        type: 'error',
        message: t('errors.failed_to_copy'),
      });
    } finally {
      setIsCopying(false);
    }
  };
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  if (error || !guide) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center py-12">
        <div className="mb-4 rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900 dark:text-red-200">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          {error || t('errors.something_went_wrong')}
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          {t('errors.try_again_later')}
        </p>
        <Button
          variant="primary"
          onClick={() => navigate('/discover')}
        >
          {t('common.back_to_discover')}
        </Button>
      </div>
    );
  }
  
  return (
    <div className="py-6">
      {/* Hero section */}
      <div className="relative mb-8 overflow-hidden rounded-lg">
        <img
          src={guide.coverImage}
          alt={guide.title}
          className="h-64 w-full object-cover md:h-80 lg:h-96"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="mb-2 text-2xl font-bold text-white md:text-3xl">
            {guide.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-white">
              {guide.destination} • {guide.days} {t('common.days')}
            </p>
            <div className="flex items-center">
              <svg
                className="mr-1 h-5 w-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 15.585l-7.07 3.715 1.35-7.865L.36 7.13l7.91-1.15L10 0l1.73 5.98 7.91 1.15-3.92 3.82 1.35 7.865L10 15.585z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-white">
                {guide.rating} ({guide.reviews} {t('common.reviews')})
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Guide details */}
      <div className="mb-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {guide.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mb-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            {t('discover.about_this_guide')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{guide.summary}</p>
        </div>
        
        <div className="mb-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            {t('discover.itinerary_preview')}
          </h2>
          
          <div className="space-y-6">
            {guide.planPreview.map((day) => (
              <div
                key={day.dateIndex}
                className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
              >
                <h3 className="mb-3 text-lg font-medium text-gray-900 dark:text-white">
                  {t('common.day')} {day.dateIndex + 1}
                </h3>
                <div className="space-y-4">
                  {day.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex border-l-4 border-primary-500 pl-4 dark:border-primary-400"
                    >
                      <div className="min-w-[80px] text-sm text-gray-500 dark:text-gray-400">
                        {item.startTime && item.endTime
                          ? `${item.startTime} - ${item.endTime}`
                          : t('common.flexible')}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </h4>
                        {item.notes && (
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                            {item.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="sticky bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 md:relative md:border-none md:bg-transparent md:p-0 md:dark:bg-transparent">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="primary"
            onClick={handleCopyGuide}
            isLoading={isCopying}
            className="flex-1"
          >
            {t('discover.copy_itinerary')}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/discover')}
            className="flex-1"
          >
            {t('common.back_to_discover')}
          </Button>
        </div>
      </div>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default GuidePage;

