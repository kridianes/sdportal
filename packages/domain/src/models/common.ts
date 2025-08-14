import { z } from 'zod';

// Common types used across multiple models

export const UserRefSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  avatarUrl: z.string().url().optional(),
});

export type UserRef = z.infer<typeof UserRefSchema>;

export const TravelStyleSchema = z.enum([
  'adventure',
  'beach',
  'city',
  'culture',
  'food',
  'luxury',
  'nature',
  'nightlife',
  'relaxation',
  'road_trip',
  'romantic',
  'shopping',
  'solo',
  'wellness',
  'wildlife',
]);

export type TravelStyle = z.infer<typeof TravelStyleSchema>;

export const ChecklistItemSchema = z.object({
  id: z.string(),
  text: z.string(),
  done: z.boolean().default(false),
});

export type ChecklistItem = z.infer<typeof ChecklistItemSchema>;

export const PackingItemSchema = z.object({
  id: z.string(),
  text: z.string(),
  done: z.boolean().default(false),
  category: z.string().optional(),
});

export type PackingItem = z.infer<typeof PackingItemSchema>;

export const BudgetCategorySchema = z.object({
  name: z.string(),
  amount: z.number().nonnegative(),
});

export type BudgetCategory = z.infer<typeof BudgetCategorySchema>;

export const BudgetSchema = z.object({
  currency: z.string(),
  planned: z.array(BudgetCategorySchema),
  actual: z.array(BudgetCategorySchema).optional(),
});

export type Budget = z.infer<typeof BudgetSchema>;

// Factory functions for creating new instances
export const createChecklistItem = (text: string): ChecklistItem => ({
  id: crypto.randomUUID(),
  text,
  done: false,
});

export const createPackingItem = (text: string, category?: string): PackingItem => ({
  id: crypto.randomUUID(),
  text,
  done: false,
  category,
});

export const createBudgetCategory = (name: string, amount: number): BudgetCategory => ({
  name,
  amount,
});

export const createBudget = (currency: string, categories: BudgetCategory[] = []): Budget => ({
  currency,
  planned: categories,
});

// Helper functions
export const calculateBudgetTotal = (categories: BudgetCategory[]): number => {
  return categories.reduce((total, category) => total + category.amount, 0);
};

export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

