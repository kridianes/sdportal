import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Guide } from '@travel-app/domain';
import { GuidesService, MockGuidesService } from '@travel-app/services';
import SearchBar from '@/components/discover/SearchBar';
import FilterChips from '@/components/discover/FilterChips';
import GuidesGrid from '@/components/discover/GuidesGrid';
import LoadingScreen from '@/components/common/LoadingScreen';

const DiscoverPage = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [featuredGuides, setFeaturedGuides] = useState<Guide[]>([]);
  const [popularGuides, setPopularGuides] = useState<Guide[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Guide[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Initialize services
  const guidesService = new MockGuidesService();
  
  useEffect(() => {
    const fetchGuides = async () => {
      setIsLoading(true);
      try {
        const [featured, popular] = await Promise.all([
          guidesService.getFeatured(),
          guidesService.getPopular(),
        ]);
        
        setFeaturedGuides(featured);
        setPopularGuides(popular);
      } catch (error) {
        console.error('Error fetching guides:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGuides();
  }, []);
  
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (!query && activeFilters.length === 0) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
    try {
      const results = await guidesService.search({
        searchQuery: query,
        tags: activeFilters.length > 0 ? activeFilters : undefined,
      });
      
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching guides:', error);
    }
  };
  
  const handleFilterChange = async (filters: string[]) => {
    setActiveFilters(filters);
    
    if (!searchQuery && filters.length === 0) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
    try {
      const results = await guidesService.search({
        searchQuery,
        tags: filters.length > 0 ? filters : undefined,
      });
      
      setSearchResults(results);
    } catch (error) {
      console.error('Error filtering guides:', error);
    }
  };
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          {t('discover.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('discover.subtitle')}
        </p>
      </div>
      
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      <div className="mb-8">
        <FilterChips
          filters={[
            'Adventure',
            'Beach',
            'City',
            'Culture',
            'Food',
            'Nature',
            'Relaxation',
          ]}
          activeFilters={activeFilters}
          onChange={handleFilterChange}
        />
      </div>
      
      {isSearching ? (
        <div className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            {searchResults.length > 0
              ? t('discover.search_results', { count: searchResults.length })
              : t('discover.no_results')}
          </h2>
          <GuidesGrid guides={searchResults} />
        </div>
      ) : (
        <>
          <div className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              {t('discover.featured_guides')}
            </h2>
            <GuidesGrid guides={featuredGuides} />
          </div>
          
          <div className="mb-10">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              {t('discover.popular_guides')}
            </h2>
            <GuidesGrid guides={popularGuides} />
          </div>
        </>
      )}
    </div>
  );
};

export default DiscoverPage;

