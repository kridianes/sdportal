import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Guide } from '@travel-app/domain';
import { useAuthStore } from '@/stores/authStore';
import AuthModal from '@/components/auth/AuthModal';
import { useToastContext } from '@travel-app/ui-core';

interface GuideCardProps {
  guide: Guide;
}

const GuideCard = ({ guide }: GuideCardProps) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthStore();
  const { toast } = useToastContext();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    
    setIsSaved(!isSaved);
    
    toast({
      type: 'success',
      message: isSaved
        ? t('discover.guide_unsaved')
        : t('discover.guide_saved'),
    });
  };
  
  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
        <Link to={`/guides/${guide.id}`} className="block">
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={guide.coverImage}
              alt={guide.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-0 right-0 m-2">
              <button
                type="button"
                onClick={handleSaveClick}
                className="rounded-full bg-white p-2 text-gray-400 shadow-sm hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-primary-400"
              >
                <span className="sr-only">
                  {isSaved ? t('common.unsave') : t('common.save')}
                </span>
                {isSaved ? (
                  <svg
                    className="h-5 w-5 text-primary-500 dark:text-primary-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {guide.title}
              </h3>
              <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <svg
                  className="mr-1 h-4 w-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15.585l-7.07 3.715 1.35-7.865L.36 7.13l7.91-1.15L10 0l1.73 5.98 7.91 1.15-3.92 3.82 1.35 7.865L10 15.585z"
                    clipRule="evenodd"
                  />
                </svg>
                {guide.rating}
              </span>
            </div>
            
            <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
              {guide.destination} • {guide.days} {t('common.days')}
            </p>
            
            <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
              {guide.summary}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {guide.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                >
                  {tag}
                </span>
              ))}
              {guide.tags.length > 3 && (
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  +{guide.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default GuideCard;

