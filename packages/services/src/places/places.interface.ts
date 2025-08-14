export interface PlaceDetails {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  photos: string[];
  rating: number;
  types: string[];
  openingHours?: {
    weekdayText: string[];
    isOpen: boolean;
  };
  website?: string;
  phoneNumber?: string;
  priceLevel?: number;
}

export interface PlaceSearchResult {
  id: string;
  name: string;
  address: string;
  photos: string[];
  rating: number;
  types: string[];
}

export interface PlacesService {
  /**
   * Search for places by query
   */
  searchPlaces(query: string, location?: string): Promise<PlaceSearchResult[]>;
  
  /**
   * Get place details by ID
   */
  getPlaceDetails(id: string): Promise<PlaceDetails>;
  
  /**
   * Get nearby places
   */
  getNearbyPlaces(
    lat: number, 
    lng: number, 
    radius: number, 
    type?: string
  ): Promise<PlaceSearchResult[]>;
}

