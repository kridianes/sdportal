import { Observable } from 'rxjs';
import { Guide, Trip } from '@travel-planner/domain';

export interface TripsService {
  /**
   * Get all trips for the current user
   */
  getTrips(): Promise<Trip[]>;
  
  /**
   * Get a trip by ID
   */
  getTripById(id: string): Promise<Trip | null>;
  
  /**
   * Create a new trip
   */
  createTrip(trip: Omit<Trip, 'id'>): Promise<Trip>;
  
  /**
   * Update an existing trip
   */
  updateTrip(id: string, trip: Partial<Trip>): Promise<Trip>;
  
  /**
   * Delete a trip
   */
  deleteTrip(id: string): Promise<void>;
  
  /**
   * Copy a trip from a guide
   */
  copyFromGuide(guide: Guide): Promise<Trip>;
  
  /**
   * Get a share link for a trip
   */
  getShareLink(tripId: string): Promise<string>;
  
  /**
   * Get trips as an observable
   */
  trips$: Observable<Trip[]>;
}

