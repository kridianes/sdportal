import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@travel-app/ui-core';
import { useAuthStore } from '@/stores/authStore';
import { useToastContext } from '@travel-app/ui-core';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl?: string;
}

const AuthModal = ({ isOpen, onClose, redirectUrl }: AuthModalProps) => {
  const { t } = useTranslation();
  const { login, isLoading, error } = useAuthStore();
  const { toast } = useToastContext();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  const handleAuth = async (provider: string) => {
    try {
      await login(provider);
      toast({
        type: 'success',
        message: t('auth.login_success'),
      });
      onClose();
      
      // Redirect if needed
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        type: 'error',
        message: t('auth.login_error'),
      });
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="p-6">
        {/* Tabs */}
        <div className="mb-6 flex border-b border-gray-200 dark:border-gray-700">
          <button
            type="button"
            className={`mr-4 pb-4 text-sm font-medium ${
              activeTab === 'login'
                ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                : 'text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('login')}
          >
            {t('auth.sign_in')}
          </button>
          <button
            type="button"
            className={`mr-4 pb-4 text-sm font-medium ${
              activeTab === 'signup'
                ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
                : 'text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            {t('auth.sign_up')}
          </button>
        </div>
        
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {activeTab === 'login' ? t('auth.welcome_back') : t('auth.create_account')}
        </h2>
        
        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900 dark:text-red-100">
            {error}
          </div>
        )}
        
        {/* OAuth buttons */}
        <div className="space-y-3">
          <button
            type="button"
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            onClick={() => handleAuth('google')}
            disabled={isLoading}
          >
            <svg
              className="mr-2 h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
            </svg>
            {activeTab === 'login'
              ? t('auth.continue_with_google')
              : t('auth.sign_up_with_google')}
          </button>
          
          <button
            type="button"
            className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            onClick={() => handleAuth('facebook')}
            disabled={isLoading}
          >
            <svg
              className="mr-2 h-5 w-5 text-blue-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            {activeTab === 'login'
              ? t('auth.continue_with_facebook')
              : t('auth.sign_up_with_facebook')}
          </button>
        </div>
        
        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="mx-4 flex-shrink text-sm text-gray-500 dark:text-gray-400">
            {t('common.or')}
          </span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        
        {/* Guest mode */}
        <button
          type="button"
          className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          onClick={() => {
            onClose();
            toast({
              type: 'info',
              message: t('auth.guest_mode_enabled'),
            });
          }}
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          {t('auth.continue_as_guest')}
        </button>
        
        {/* Terms and privacy */}
        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          {t('auth.terms_privacy_notice')}{' '}
          <a
            href="#"
            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            {t('auth.terms')}
          </a>{' '}
          {t('common.and')}{' '}
          <a
            href="#"
            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            {t('auth.privacy_policy')}
          </a>
          .
        </p>
      </div>
    </Modal>
  );
};

export default AuthModal;

