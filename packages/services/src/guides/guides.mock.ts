import { createDayPlan, createGuide, Guide } from '@travel-planner/domain';
import { GuidesFilter, GuidesService } from './guides.interface';

/**
 * Mock implementation of the GuidesService
 */
export class MockGuidesService implements GuidesService {
  private guides: Guide[];
  
  constructor() {
    // Initialize with sample guides
    this.guides = [
      createGuide({
        title: 'Weekend in Paris',
        destination: 'Paris, France',
        days: 3,
        tags: ['city', 'culture', 'food'],
        coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
        summary: 'Experience the best of Paris in a weekend. Visit iconic landmarks, enjoy delicious food, and immerse yourself in Parisian culture.',
        planPreview: [
          createDayPlan({
            dateIndex: 0,
            items: [
              {
                id: '1',
                placeId: 'ChIJAQquYc1v5kcRLKslDuENAxg',
                title: 'Eiffel Tower',
                startTime: '09:00',
                endTime: '11:00',
                durationMins: 120,
              },
              {
                id: '2',
                placeId: 'ChIJATr1n-Fx5kcRjQb6q6cdQDY',
                title: 'Louvre Museum',
                startTime: '13:00',
                endTime: '16:00',
                durationMins: 180,
              },
            ],
          }),
        ],
      }),
      createGuide({
        title: 'Tokyo Adventure',
        destination: 'Tokyo, Japan',
        days: 5,
        tags: ['city', 'culture', 'food', 'shopping'],
        coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
        summary: 'Discover the vibrant city of Tokyo with this 5-day itinerary. From traditional temples to modern shopping districts, experience the best of Japan\'s capital.',
      }),
      createGuide({
        title: 'New York City Explorer',
        destination: 'New York, USA',
        days: 4,
        tags: ['city', 'culture', 'food', 'shopping'],
        coverImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
        summary: 'Explore the Big Apple with this comprehensive 4-day guide. Visit iconic landmarks, enjoy diverse cuisine, and experience the energy of New York City.',
      }),
    ];
  }
  
  /**
   * Get all guides
   */
  async getGuides(): Promise<Guide[]> {
    return this.guides;
  }
  
  /**
   * Get a guide by ID
   */
  async getGuideById(id: string): Promise<Guide | null> {
    return this.guides.find(guide => guide.id === id) || null;
  }
  
  /**
   * Search guides by filter
   */
  async searchGuides(filter: GuidesFilter): Promise<Guide[]> {
    let filteredGuides = this.guides;
    
    if (filter.destination) {
      const destination = filter.destination.toLowerCase();
      filteredGuides = filteredGuides.filter(guide => 
        guide.destination.toLowerCase().includes(destination)
      );
    }
    
    if (filter.days) {
      filteredGuides = filteredGuides.filter(guide => 
        guide.days <= filter.days!
      );
    }
    
    if (filter.tags && filter.tags.length > 0) {
      filteredGuides = filteredGuides.filter(guide => 
        filter.tags!.some(tag => guide.tags.includes(tag))
      );
    }
    
    return filteredGuides;
  }
  
  /**
   * Get featured guides
   */
  async getFeaturedGuides(): Promise<Guide[]> {
    // In a real app, this would return guides marked as featured
    return this.guides.slice(0, 3);
  }
}

