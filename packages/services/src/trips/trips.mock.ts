import { BehaviorSubject, Observable } from 'rxjs';
import { createTrip, Guide, Trip } from '@travel-planner/domain';
import { StorageService } from '../storage';
import { TripsService } from './trips.interface';

/**
 * Mock implementation of the TripsService
 */
export class MockTripsService implements TripsService {
  private tripsSubject: BehaviorSubject<Trip[]>;
  private storageKey = 'trips';
  
  constructor(private storageService: StorageService) {
    this.tripsSubject = new BehaviorSubject<Trip[]>([]);
    this.loadTrips();
  }
  
  /**
   * Get trips as an observable
   */
  get trips$(): Observable<Trip[]> {
    return this.tripsSubject.asObservable();
  }
  
  /**
   * Get all trips for the current user
   */
  async getTrips(): Promise<Trip[]> {
    return this.tripsSubject.value;
  }
  
  /**
   * Get a trip by ID
   */
  async getTripById(id: string): Promise<Trip | null> {
    const trips = this.tripsSubject.value;
    return trips.find(trip => trip.id === id) || null;
  }
  
  /**
   * Create a new trip
   */
  async createTrip(tripData: Omit<Trip, 'id'>): Promise<Trip> {
    const trip = createTrip(tripData as Partial<Trip>);
    const trips = [...this.tripsSubject.value, trip];
    
    await this.saveTrips(trips);
    
    return trip;
  }
  
  /**
   * Update an existing trip
   */
  async updateTrip(id: string, tripData: Partial<Trip>): Promise<Trip> {
    const trips = this.tripsSubject.value;
    const index = trips.findIndex(trip => trip.id === id);
    
    if (index === -1) {
      throw new Error(`Trip with ID ${id} not found`);
    }
    
    const updatedTrip = { ...trips[index], ...tripData };
    const updatedTrips = [...trips];
    updatedTrips[index] = updatedTrip;
    
    await this.saveTrips(updatedTrips);
    
    return updatedTrip;
  }
  
  /**
   * Delete a trip
   */
  async deleteTrip(id: string): Promise<void> {
    const trips = this.tripsSubject.value;
    const updatedTrips = trips.filter(trip => trip.id !== id);
    
    await this.saveTrips(updatedTrips);
  }
  
  /**
   * Copy a trip from a guide
   */
  async copyFromGuide(guide: Guide): Promise<Trip> {
    const trip = createTrip({
      title: `Copy of ${guide.title}`,
      destination: guide.destination,
      days: guide.days,
      plan: guide.planPreview,
    });
    
    const trips = [...this.tripsSubject.value, trip];
    
    await this.saveTrips(trips);
    
    return trip;
  }
  
  /**
   * Get a share link for a trip
   */
  async getShareLink(tripId: string): Promise<string> {
    // In a real app, this would create a shareable link with proper permissions
    return `${window.location.origin}/trip/${tripId}/view`;
  }
  
  /**
   * Load trips from storage
   */
  private async loadTrips(): Promise<void> {
    try {
      const trips = await this.storageService.getItem<Trip[]>(this.storageKey);
      
      if (trips) {
        this.tripsSubject.next(trips);
      } else {
        // Initialize with some sample trips
        const sampleTrips = [
          createTrip({
            title: 'Weekend in Paris',
            destination: 'Paris, France',
            days: 3,
          }),
          createTrip({
            title: 'Tokyo Adventure',
            destination: 'Tokyo, Japan',
            days: 7,
          }),
        ];
        
        await this.saveTrips(sampleTrips);
      }
    } catch (error) {
      console.error('Error loading trips:', error);
      this.tripsSubject.next([]);
    }
  }
  
  /**
   * Save trips to storage
   */
  private async saveTrips(trips: Trip[]): Promise<void> {
    await this.storageService.setItem(this.storageKey, trips);
    this.tripsSubject.next(trips);
  }
}

