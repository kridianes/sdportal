import { Guide } from '@travel-planner/domain';

export interface GuidesFilter {
  destination?: string;
  days?: number;
  tags?: string[];
}

export interface GuidesService {
  /**
   * Get all guides
   */
  getGuides(): Promise<Guide[]>;
  
  /**
   * Get a guide by ID
   */
  getGuideById(id: string): Promise<Guide | null>;
  
  /**
   * Search guides by filter
   */
  searchGuides(filter: GuidesFilter): Promise<Guide[]>;
  
  /**
   * Get featured guides
   */
  getFeaturedGuides(): Promise<Guide[]>;
}

