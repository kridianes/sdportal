export type Season = 'winter' | 'spring' | 'summer' | 'fall';

export interface PacklistItem {
  text: string;
  category: string;
}

export interface PacklistService {
  /**
   * Generate a packing list based on destination, days, and season
   * @param destination The destination name
   * @param days The number of days
   * @param season The season of travel
   * @returns A promise that resolves to an array of packing list items
   */
  generateByDestination(
    destination: string,
    days: number,
    season?: Season
  ): Promise<PacklistItem[]>;
  
  /**
   * Get default packing list categories
   * @returns An array of category names
   */
  getCategories(): string[];
}

