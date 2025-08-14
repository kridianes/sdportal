import { z } from 'zod';
import { TripVisibility } from '../models';
import { userRefSchema } from './user.schema';

// Checklist item schema
export const checklistItemSchema = z.object({
  id: z.string().uuid(),
  text: z.string().min(1),
  done: z.boolean(),
});

// Packing item schema
export const packingItemSchema = z.object({
  id: z.string().uuid(),
  text: z.string().min(1),
  done: z.boolean(),
  category: z.string().optional(),
});

// Plan item schema
export const planItemSchema = z.object({
  id: z.string().uuid(),
  placeId: z.string(),
  title: z.string().min(1),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  notes: z.string().optional(),
  checklist: z.array(checklistItemSchema).optional(),
  durationMins: z.number().int().positive().optional(),
});

// Day plan schema
export const dayPlanSchema = z.object({
  dateIndex: z.number().int().nonnegative(),
  items: z.array(planItemSchema),
});

// Budget category schema
export const budgetCategorySchema = z.object({
  name: z.string().min(1),
  amount: z.number().nonnegative(),
});

// Budget schema
export const budgetSchema = z.object({
  currency: z.string().min(1),
  planned: z.array(budgetCategorySchema),
  actual: z.array(budgetCategorySchema).optional(),
});

// Trip visibility enum schema
export const tripVisibilitySchema = z.nativeEnum(TripVisibility);

// Trip schema
export const tripSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  destination: z.string().min(1),
  startDate: z.date().optional(),
  days: z.number().int().positive(),
  visibility: tripVisibilitySchema,
  collaborators: z.array(userRefSchema).optional(),
  plan: z.array(dayPlanSchema),
  packingList: z.array(packingItemSchema).optional(),
  budget: budgetSchema.optional(),
});

