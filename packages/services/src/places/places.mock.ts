import { PlaceDetails, PlaceSearchResult, PlacesService } from './places.interface';

/**
 * Mock implementation of the PlacesService
 */
export class MockPlacesService implements PlacesService {
  private places: PlaceDetails[] = [
    {
      id: 'ChIJAQquYc1v5kcRLKslDuENAxg',
      name: 'Eiffel Tower',
      address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
      location: {
        lat: 48.8584,
        lng: 2.2945,
      },
      photos: [
        'https://images.unsplash.com/photo-1543349689-9a4d426bee8e',
        'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f',
      ],
      rating: 4.6,
      types: ['tourist_attraction', 'point_of_interest'],
      openingHours: {
        weekdayText: [
          'Monday: 9:00 AM – 12:00 AM',
          'Tuesday: 9:00 AM – 12:00 AM',
          'Wednesday: 9:00 AM – 12:00 AM',
          'Thursday: 9:00 AM – 12:00 AM',
          'Friday: 9:00 AM – 12:00 AM',
          'Saturday: 9:00 AM – 12:00 AM',
          'Sunday: 9:00 AM – 12:00 AM',
        ],
        isOpen: true,
      },
      website: 'https://www.toureiffel.paris/en',
      phoneNumber: '+33 892 70 12 39',
    },
    {
      id: 'ChIJATr1n-Fx5kcRjQb6q6cdQDY',
      name: 'Louvre Museum',
      address: 'Rue de Rivoli, 75001 Paris, France',
      location: {
        lat: 48.8606,
        lng: 2.3376,
      },
      photos: [
        'https://images.unsplash.com/photo-1565099824688-e8c8a9b0dcf6',
        'https://images.unsplash.com/photo-1572953109213-3be62398eb95',
      ],
      rating: 4.7,
      types: ['museum', 'tourist_attraction', 'point_of_interest'],
      openingHours: {
        weekdayText: [
          'Monday: 9:00 AM – 6:00 PM',
          'Tuesday: Closed',
          'Wednesday: 9:00 AM – 6:00 PM',
          'Thursday: 9:00 AM – 6:00 PM',
          'Friday: 9:00 AM – 6:00 PM',
          'Saturday: 9:00 AM – 6:00 PM',
          'Sunday: 9:00 AM – 6:00 PM',
        ],
        isOpen: true,
      },
      website: 'https://www.louvre.fr/en',
      phoneNumber: '+33 1 40 20 53 17',
    },
    {
      id: 'ChIJK7NkMFHhQUcRhxPZEZCIzcU',
      name: 'Tokyo Skytree',
      address: '1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-0045, Japan',
      location: {
        lat: 35.7101,
        lng: 139.8107,
      },
      photos: [
        'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc',
        'https://images.unsplash.com/photo-1542051841857-5f90071e7989',
      ],
      rating: 4.5,
      types: ['tourist_attraction', 'point_of_interest'],
      openingHours: {
        weekdayText: [
          'Monday: 10:00 AM – 9:00 PM',
          'Tuesday: 10:00 AM – 9:00 PM',
          'Wednesday: 10:00 AM – 9:00 PM',
          'Thursday: 10:00 AM – 9:00 PM',
          'Friday: 10:00 AM – 9:00 PM',
          'Saturday: 10:00 AM – 9:00 PM',
          'Sunday: 10:00 AM – 9:00 PM',
        ],
        isOpen: true,
      },
      website: 'http://www.tokyo-skytree.jp/en/',
      phoneNumber: '+81 570-550-634',
    },
    {
      id: 'ChIJPTacEpBQwokRKwIlDXelxkA',
      name: 'Statue of Liberty',
      address: 'New York, NY 10004, United States',
      location: {
        lat: 40.6892,
        lng: -74.0445,
      },
      photos: [
        'https://images.unsplash.com/photo-1546436836-07a91091f160',
        'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a',
      ],
      rating: 4.7,
      types: ['tourist_attraction', 'point_of_interest'],
      openingHours: {
        weekdayText: [
          'Monday: 9:00 AM – 5:00 PM',
          'Tuesday: 9:00 AM – 5:00 PM',
          'Wednesday: 9:00 AM – 5:00 PM',
          'Thursday: 9:00 AM – 5:00 PM',
          'Friday: 9:00 AM – 5:00 PM',
          'Saturday: 9:00 AM – 5:00 PM',
          'Sunday: 9:00 AM – 5:00 PM',
        ],
        isOpen: true,
      },
      website: 'https://www.nps.gov/stli/index.htm',
      phoneNumber: '+1 212-363-3200',
    },
  ];
  
  /**
   * Search for places by query
   */
  async searchPlaces(query: string, location?: string): Promise<PlaceSearchResult[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const normalizedQuery = query.toLowerCase();
    const normalizedLocation = location?.toLowerCase() || '';
    
    return this.places
      .filter(place => {
        const matchesQuery = place.name.toLowerCase().includes(normalizedQuery) ||
          place.types.some(type => type.includes(normalizedQuery));
        
        const matchesLocation = !location || 
          place.address.toLowerCase().includes(normalizedLocation);
        
        return matchesQuery && matchesLocation;
      })
      .map(place => this.mapToSearchResult(place));
  }
  
  /**
   * Get place details by ID
   */
  async getPlaceDetails(id: string): Promise<PlaceDetails> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const place = this.places.find(p => p.id === id);
    
    if (!place) {
      throw new Error(`Place with ID ${id} not found`);
    }
    
    return place;
  }
  
  /**
   * Get nearby places
   */
  async getNearbyPlaces(
    lat: number, 
    lng: number, 
    radius: number, 
    type?: string
  ): Promise<PlaceSearchResult[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Simple distance calculation (not accurate for large distances)
    const filteredPlaces = this.places.filter(place => {
      const distance = Math.sqrt(
        Math.pow(place.location.lat - lat, 2) + 
        Math.pow(place.location.lng - lng, 2)
      ) * 111000; // Rough conversion to meters
      
      const matchesType = !type || place.types.includes(type);
      
      return distance <= radius && matchesType;
    });
    
    return filteredPlaces.map(place => this.mapToSearchResult(place));
  }
  
  /**
   * Map a PlaceDetails to a PlaceSearchResult
   */
  private mapToSearchResult(place: PlaceDetails): PlaceSearchResult {
    return {
      id: place.id,
      name: place.name,
      address: place.address,
      photos: place.photos,
      rating: place.rating,
      types: place.types,
    };
  }
}

