import { z } from 'zod';
import { TravelStyleSchema } from './common';

export const PreferencesSchema = z.object({
  travelStyles: z.array(TravelStyleSchema).default([]),
  interests: z.array(z.string()).default([]),
  homeBase: z.string().optional(),
  typicalTripLength: z.number().int().positive().optional(),
});

export type Preferences = z.infer<typeof PreferencesSchema>;

export const UserProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  preferences: PreferencesSchema.default({}),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

// Factory functions for creating new instances
export const createPreferences = (
  travelStyles: string[] = [],
  interests: string[] = [],
  homeBase?: string,
  typicalTripLength?: number
): Preferences => ({
  travelStyles: travelStyles as any[], // Cast to satisfy TypeScript
  interests,
  homeBase,
  typicalTripLength,
});

export const createUserProfile = (
  id: string,
  email: string,
  name?: string,
  avatarUrl?: string,
  preferences: Preferences = createPreferences()
): UserProfile => ({
  id,
  email,
  name,
  avatarUrl,
  preferences,
});

// Helper functions
export const isPreferencesComplete = (preferences: Preferences): boolean => {
  return (
    preferences.travelStyles.length > 0 &&
    preferences.interests.length > 0 &&
    !!preferences.homeBase
  );
};

