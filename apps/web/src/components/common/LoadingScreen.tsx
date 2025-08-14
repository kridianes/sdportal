import { useTranslation } from 'react-i18next';

const LoadingScreen = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex h-full min-h-[50vh] flex-col items-center justify-center">
      <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600 dark:border-primary-800 dark:border-t-primary-400"></div>
      <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
        {t('common.loading')}...
      </p>
    </div>
  );
};

export default LoadingScreen;

