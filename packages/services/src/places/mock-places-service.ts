import { PlacesService, PlaceSearchResult, PlaceDetails, PlaceLocation } from './types';
import { mockPlaces } from './mock-data';

export class MockPlacesService implements PlacesService {
  private places: Map<string, PlaceDetails> = new Map();
  
  constructor() {
    // Initialize with mock data
    mockPlaces.forEach(place => {
      this.places.set(place.id, place);
    });
  }
  
  async searchPlaces(
    query: string,
    location?: PlaceLocation,
    radius?: number
  ): Promise<PlaceSearchResult[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerQuery = query.toLowerCase();
    
    // Filter places based on the query
    const results = Array.from(this.places.values())
      .filter(place => {
        // Match by name or address
        const nameMatch = place.name.toLowerCase().includes(lowerQuery);
        const addressMatch = place.formattedAddress.toLowerCase().includes(lowerQuery);
        const typeMatch = place.types.some(type => type.toLowerCase().includes(lowerQuery));
        
        return nameMatch || addressMatch || typeMatch;
      })
      .map(place => ({
        id: place.id,
        name: place.name,
        formattedAddress: place.formattedAddress,
        location: place.location,
        photos: place.photos,
        rating: place.rating,
        types: place.types,
      }));
    
    // If location and radius are provided, filter by distance
    if (location && radius) {
      return results.filter(place => {
        const distance = this.calculateDistance(
          location.lat,
          location.lng,
          place.location.lat,
          place.location.lng
        );
        return distance <= radius / 1000; // Convert meters to kilometers
      });
    }
    
    return results;
  }
  
  async getPlaceDetails(placeId: string): Promise<PlaceDetails> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const place = this.places.get(placeId);
    if (!place) {
      throw new Error(`Place with ID ${placeId} not found`);
    }
    
    return place;
  }
  
  async getMapUrl(placeId: string): Promise<string> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const place = this.places.get(placeId);
    if (!place) {
      throw new Error(`Place with ID ${placeId} not found`);
    }
    
    // Generate a Google Maps URL
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      place.name
    )}&query_place_id=${placeId}`;
  }
  
  async getDirectionsUrl(
    placeId: string,
    origin?: PlaceLocation
  ): Promise<string> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const place = this.places.get(placeId);
    if (!place) {
      throw new Error(`Place with ID ${placeId} not found`);
    }
    
    // Generate a Google Maps directions URL
    let url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      place.name
    )}&destination_place_id=${placeId}`;
    
    // Add origin if provided
    if (origin) {
      url += `&origin=${origin.lat},${origin.lng}`;
    }
    
    return url;
  }
  
  // Helper method to calculate distance between two points using the Haversine formula
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }
  
  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}

