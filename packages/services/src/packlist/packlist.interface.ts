import { PackingItem } from '@travel-planner/domain';

export enum Season {
  SPRING = 'spring',
  SUMMER = 'summer',
  FALL = 'fall',
  WINTER = 'winter',
}

export interface PacklistService {
  /**
   * Generate a packing list based on destination, days, and season
   */
  generatePackingList(
    destination: string,
    days: number,
    season: Season
  ): Promise<PackingItem[]>;
}

