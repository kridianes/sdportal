import { useTranslation } from 'react-i18next';

interface FilterChipsProps {
  filters: string[];
  activeFilters: string[];
  onChange: (filters: string[]) => void;
}

const FilterChips = ({ filters, activeFilters, onChange }: FilterChipsProps) => {
  const { t } = useTranslation();
  
  const toggleFilter = (filter: string) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter((f) => f !== filter)
      : [...activeFilters, filter];
    
    onChange(newFilters);
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeFilters.includes(filter)
              ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
          onClick={() => toggleFilter(filter)}
        >
          {filter}
        </button>
      ))}
      
      {activeFilters.length > 0 && (
        <button
          type="button"
          className="rounded-full px-4 py-2 text-sm font-medium text-gray-600 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          onClick={() => onChange([])}
        >
          {t('common.clear_all')}
        </button>
      )}
    </div>
  );
};

export default FilterChips;

