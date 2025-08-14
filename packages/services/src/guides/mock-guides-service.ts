import { Guide, createGuide, filterGuidesByDestination, filterGuidesByDuration, filterGuidesByTags, sortGuidesByPopularity, sortGuidesByRating } from '@travel-app/domain';
import { GuidesService, GuidesFilter } from './types';
import { mockGuides } from './mock-data';

export class MockGuidesService implements GuidesService {
  private guides: Guide[] = [];
  
  constructor() {
    // Initialize with mock data
    this.guides = mockGuides;
  }
  
  async list(): Promise<Guide[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return this.guides;
  }
  
  async search(filter: GuidesFilter): Promise<Guide[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let filteredGuides = [...this.guides];
    
    // Apply destination filter
    if (filter.destination) {
      filteredGuides = filterGuidesByDestination(filteredGuides, filter.destination);
    }
    
    // Apply duration filter
    if (filter.minDays !== undefined && filter.maxDays !== undefined) {
      filteredGuides = filterGuidesByDuration(filteredGuides, filter.minDays, filter.maxDays);
    }
    
    // Apply tags filter
    if (filter.tags && filter.tags.length > 0) {
      filteredGuides = filterGuidesByTags(filteredGuides, filter.tags);
    }
    
    // Apply search query filter
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      filteredGuides = filteredGuides.filter(guide => 
        guide.title.toLowerCase().includes(query) ||
        guide.destination.toLowerCase().includes(query) ||
        guide.summary.toLowerCase().includes(query) ||
        guide.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return filteredGuides;
  }
  
  async getById(id: string): Promise<Guide | null> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const guide = this.guides.find(g => g.id === id);
    return guide || null;
  }
  
  async getFeatured(limit: number = 6): Promise<Guide[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // For mock purposes, we'll just return the highest rated guides
    const featuredGuides = sortGuidesByRating(this.guides);
    return featuredGuides.slice(0, limit);
  }
  
  async getPopular(limit: number = 6): Promise<Guide[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Return guides sorted by number of reviews
    const popularGuides = sortGuidesByPopularity(this.guides);
    return popularGuides.slice(0, limit);
  }
}

