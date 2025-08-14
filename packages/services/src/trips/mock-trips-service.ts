import { Trip, createTrip, isTripInProgress, isTripPast, isTripUpcoming } from '@travel-app/domain';
import { TripsService, TripsFilter } from './types';
import { StorageService } from '../storage';
import { GuidesService } from '../guides';

const TRIPS_STORAGE_KEY = 'travel-app-trips';

export class MockTripsService implements TripsService {
  private trips: Trip[] = [];
  private storageService: StorageService;
  private guidesService: GuidesService;
  private userId: string;
  
  constructor(storageService: StorageService, guidesService: GuidesService, userId: string) {
    this.storageService = storageService;
    this.guidesService = guidesService;
    this.userId = userId;
    this.loadFromStorage();
  }
  
  private loadFromStorage(): void {
    const storedTrips = this.storageService.get<Trip[]>(TRIPS_STORAGE_KEY);
    if (storedTrips) {
      this.trips = storedTrips.filter(trip => trip.ownerId === this.userId);
    }
  }
  
  private saveToStorage(): void {
    this.storageService.set(TRIPS_STORAGE_KEY, this.trips);
  }
  
  async list(): Promise<Trip[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return this.trips;
  }
  
  async search(filter: TripsFilter): Promise<Trip[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let filteredTrips = [...this.trips];
    
    // Filter by status
    if (filter.upcoming) {
      filteredTrips = filteredTrips.filter(trip => isTripUpcoming(trip));
    }
    
    if (filter.past) {
      filteredTrips = filteredTrips.filter(trip => isTripPast(trip));
    }
    
    if (filter.inProgress) {
      filteredTrips = filteredTrips.filter(trip => isTripInProgress(trip));
    }
    
    // Filter by search query
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      filteredTrips = filteredTrips.filter(trip => 
        trip.title.toLowerCase().includes(query) ||
        trip.destination.toLowerCase().includes(query)
      );
    }
    
    return filteredTrips;
  }
  
  async getById(id: string): Promise<Trip | null> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const trip = this.trips.find(t => t.id === id);
    return trip || null;
  }
  
  async create(tripData: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>): Promise<Trip> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const now = new Date().toISOString();
    const newTrip: Trip = {
      ...tripData,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
      ownerId: this.userId,
    };
    
    this.trips.push(newTrip);
    this.saveToStorage();
    
    return newTrip;
  }
  
  async update(id: string, tripData: Partial<Trip>): Promise<Trip> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const index = this.trips.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error(`Trip with ID ${id} not found`);
    }
    
    // Update the trip
    const updatedTrip: Trip = {
      ...this.trips[index],
      ...tripData,
      // Don't allow overriding these fields
      id: this.trips[index].id,
      createdAt: this.trips[index].createdAt,
      ownerId: this.trips[index].ownerId,
      updatedAt: new Date().toISOString(),
    };
    
    this.trips[index] = updatedTrip;
    this.saveToStorage();
    
    return updatedTrip;
  }
  
  async delete(id: string): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const index = this.trips.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error(`Trip with ID ${id} not found`);
    }
    
    this.trips.splice(index, 1);
    this.saveToStorage();
  }
  
  async copyFromGuide(guideId: string, customizations?: Partial<Trip>): Promise<Trip> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Get the guide
    const guide = await this.guidesService.getById(guideId);
    if (!guide) {
      throw new Error(`Guide with ID ${guideId} not found`);
    }
    
    // Create a new trip based on the guide
    const newTrip = createTrip(
      this.userId,
      customizations?.title || `${guide.title} (Copy)`,
      customizations?.destination || guide.destination,
      customizations?.days || guide.days,
      customizations?.startDate,
      customizations?.visibility || 'private'
    );
    
    // Copy the plan from the guide
    newTrip.plan = guide.planPreview.map(day => ({
      ...day,
      // Generate new IDs for all items
      items: day.items.map(item => ({
        ...item,
        id: crypto.randomUUID(),
      })),
    }));
    
    // Apply any other customizations
    if (customizations) {
      Object.assign(newTrip, {
        ...customizations,
        // Don't allow overriding these fields
        id: newTrip.id,
        createdAt: newTrip.createdAt,
        updatedAt: newTrip.updatedAt,
        ownerId: this.userId,
      });
    }
    
    this.trips.push(newTrip);
    this.saveToStorage();
    
    return newTrip;
  }
  
  async shareLink(id: string): Promise<string> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const trip = this.trips.find(t => t.id === id);
    if (!trip) {
      throw new Error(`Trip with ID ${id} not found`);
    }
    
    // Generate a mock share link
    return `https://travel-app.example.com/shared/trip/${id}`;
  }
}

