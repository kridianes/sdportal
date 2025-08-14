import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@travel-app/ui-core';

const NotFoundPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center py-12 text-center">
      <div className="mb-6 text-6xl font-bold text-gray-300 dark:text-gray-700">
        404
      </div>
      <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
        {t('errors.page_not_found')}
      </h1>
      <p className="mb-8 max-w-md text-gray-600 dark:text-gray-400">
        {t('errors.page_not_found_message')}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link to="/">
          <Button variant="primary">
            {t('common.go_home')}
          </Button>
        </Link>
        <Link to="/discover">
          <Button variant="outline">
            {t('common.explore_guides')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

