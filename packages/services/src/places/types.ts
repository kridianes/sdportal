export interface PlaceLocation {
  lat: number;
  lng: number;
}

export interface PlacePhoto {
  url: string;
  width: number;
  height: number;
  attribution?: string;
}

export interface PlaceDetails {
  id: string;
  name: string;
  formattedAddress: string;
  location: PlaceLocation;
  photos: PlacePhoto[];
  rating?: number;
  userRatingsTotal?: number;
  types: string[];
  website?: string;
  phoneNumber?: string;
  openingHours?: {
    weekdayText: string[];
    isOpen?: boolean;
  };
  priceLevel?: number; // 0-4, from free to very expensive
  reviews?: {
    author: string;
    rating: number;
    text: string;
    time: number;
  }[];
}

export interface PlaceSearchResult {
  id: string;
  name: string;
  formattedAddress: string;
  location: PlaceLocation;
  photos: PlacePhoto[];
  rating?: number;
  types: string[];
}

export interface PlacesService {
  /**
   * Search for places based on a query and location
   * @param query The search query
   * @param location Optional location to search around
   * @param radius Optional radius in meters to search within
   * @returns A promise that resolves to an array of place search results
   */
  searchPlaces(
    query: string,
    location?: PlaceLocation,
    radius?: number
  ): Promise<PlaceSearchResult[]>;
  
  /**
   * Get detailed information about a place
   * @param placeId The place ID
   * @returns A promise that resolves to the place details
   */
  getPlaceDetails(placeId: string): Promise<PlaceDetails>;
  
  /**
   * Get a map URL for a place
   * @param placeId The place ID
   * @returns A promise that resolves to a map URL
   */
  getMapUrl(placeId: string): Promise<string>;
  
  /**
   * Get directions to a place
   * @param placeId The destination place ID
   * @param origin Optional origin location
   * @returns A promise that resolves to a directions URL
   */
  getDirectionsUrl(
    placeId: string,
    origin?: PlaceLocation
  ): Promise<string>;
}

