import { Trip, Guide } from '@travel-app/domain';

export interface TripsFilter {
  upcoming?: boolean;
  past?: boolean;
  inProgress?: boolean;
  searchQuery?: string;
}

export interface TripsService {
  /**
   * Get all trips for the current user
   * @returns A promise that resolves to an array of trips
   */
  list(): Promise<Trip[]>;
  
  /**
   * Search for trips based on filters
   * @param filter The filter criteria
   * @returns A promise that resolves to an array of filtered trips
   */
  search(filter: TripsFilter): Promise<Trip[]>;
  
  /**
   * Get a trip by ID
   * @param id The trip ID
   * @returns A promise that resolves to the trip or null if not found
   */
  getById(id: string): Promise<Trip | null>;
  
  /**
   * Create a new trip
   * @param trip The trip data
   * @returns A promise that resolves to the created trip
   */
  create(trip: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>): Promise<Trip>;
  
  /**
   * Update an existing trip
   * @param id The trip ID
   * @param trip The updated trip data
   * @returns A promise that resolves to the updated trip
   */
  update(id: string, trip: Partial<Trip>): Promise<Trip>;
  
  /**
   * Delete a trip
   * @param id The trip ID
   * @returns A promise that resolves when the trip is deleted
   */
  delete(id: string): Promise<void>;
  
  /**
   * Copy a trip from a guide
   * @param guideId The guide ID to copy from
   * @param customizations Optional customizations to apply to the copied trip
   * @returns A promise that resolves to the created trip
   */
  copyFromGuide(guideId: string, customizations?: Partial<Trip>): Promise<Trip>;
  
  /**
   * Generate a share link for a trip
   * @param id The trip ID
   * @returns A promise that resolves to the share link
   */
  shareLink(id: string): Promise<string>;
}

