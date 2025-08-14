import { Guide } from '@travel-app/domain';

export interface GuidesFilter {
  destination?: string;
  minDays?: number;
  maxDays?: number;
  tags?: string[];
  searchQuery?: string;
}

export interface GuidesService {
  /**
   * Get a list of all guides
   * @returns A promise that resolves to an array of guides
   */
  list(): Promise<Guide[]>;
  
  /**
   * Search for guides based on filters
   * @param filter The filter criteria
   * @returns A promise that resolves to an array of filtered guides
   */
  search(filter: GuidesFilter): Promise<Guide[]>;
  
  /**
   * Get a guide by ID
   * @param id The guide ID
   * @returns A promise that resolves to the guide or null if not found
   */
  getById(id: string): Promise<Guide | null>;
  
  /**
   * Get featured guides
   * @param limit The maximum number of guides to return
   * @returns A promise that resolves to an array of featured guides
   */
  getFeatured(limit?: number): Promise<Guide[]>;
  
  /**
   * Get popular guides
   * @param limit The maximum number of guides to return
   * @returns A promise that resolves to an array of popular guides
   */
  getPopular(limit?: number): Promise<Guide[]>;
}

