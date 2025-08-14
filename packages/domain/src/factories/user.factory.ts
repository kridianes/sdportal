import { v4 as uuidv4 } from 'uuid';
import { Preferences, TravelStyle, UserProfile, UserRef } from '../models';

/**
 * Create a new user reference
 */
export function createUserRef(overrides: Partial<UserRef> = {}): UserRef {
  return {
    id: uuidv4(),
    name: 'User Name',
    ...overrides,
  };
}

/**
 * Create new preferences
 */
export function createPreferences(overrides: Partial<Preferences> = {}): Preferences {
  return {
    travelStyles: [TravelStyle.ADVENTURE, TravelStyle.CULTURE],
    interests: ['hiking', 'museums', 'local cuisine'],
    ...overrides,
  };
}

/**
 * Create a new user profile
 */
export function createUserProfile(overrides: Partial<UserProfile> = {}): UserProfile {
  return {
    id: uuidv4(),
    email: 'user@example.com',
    name: 'User Name',
    preferences: createPreferences(),
    ...overrides,
  };
}

