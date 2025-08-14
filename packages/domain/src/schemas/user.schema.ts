import { z } from 'zod';
import { TravelStyle } from '../models';

// Travel style enum schema
export const travelStyleSchema = z.nativeEnum(TravelStyle);

// Preferences schema
export const preferencesSchema = z.object({
  travelStyles: z.array(travelStyleSchema),
  interests: z.array(z.string()),
  homeBase: z.string().optional(),
});

// User reference schema
export const userRefSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  avatarUrl: z.string().url().optional(),
});

// User profile schema
export const userProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  avatarUrl: z.string().url().optional(),
  preferences: preferencesSchema,
});

