import { v4 as uuidv4 } from 'uuid';
import { Guide } from '../models';
import { createDayPlan } from './trip.factory';

/**
 * Create a new guide
 */
export function createGuide(overrides: Partial<Guide> = {}): Guide {
  return {
    id: uuidv4(),
    title: 'Weekend in Paris',
    destination: 'Paris, France',
    days: 3,
    tags: ['city', 'culture', 'food'],
    coverImage: 'https://example.com/paris.jpg',
    summary: 'Experience the best of Paris in a weekend.',
    planPreview: [
      createDayPlan({ dateIndex: 0 }),
      createDayPlan({ dateIndex: 1 }),
      createDayPlan({ dateIndex: 2 }),
    ],
    ...overrides,
  };
}

