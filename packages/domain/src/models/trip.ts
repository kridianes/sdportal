import { z } from 'zod';
import { 
  UserRefSchema, 
  PackingItemSchema, 
  BudgetSchema,
  createPackingItem,
  createBudget
} from './common';

export const PlanItemSchema = z.object({
  id: z.string(),
  placeId: z.string().optional(),
  title: z.string(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  notes: z.string().optional(),
  checklist: z.array(z.object({
    id: z.string(),
    text: z.string(),
    done: z.boolean().default(false),
  })).optional(),
  durationMins: z.number().int().nonnegative().optional(),
});

export type PlanItem = z.infer<typeof PlanItemSchema>;

export const DayPlanSchema = z.object({
  dateIndex: z.number().int().nonnegative(),
  items: z.array(PlanItemSchema).default([]),
});

export type DayPlan = z.infer<typeof DayPlanSchema>;

export const TripVisibilitySchema = z.enum(['private', 'public', 'friends']);

export type TripVisibility = z.infer<typeof TripVisibilitySchema>;

export const TripSchema = z.object({
  id: z.string(),
  title: z.string(),
  destination: z.string(),
  startDate: z.string().optional(), // ISO date string
  days: z.number().int().positive(),
  visibility: TripVisibilitySchema.default('private'),
  collaborators: z.array(UserRefSchema).optional(),
  plan: z.array(DayPlanSchema).default([]),
  packingList: z.array(PackingItemSchema).optional(),
  budget: BudgetSchema.optional(),
  createdAt: z.string(), // ISO date string
  updatedAt: z.string(), // ISO date string
  ownerId: z.string(),
});

export type Trip = z.infer<typeof TripSchema>;

// Factory functions for creating new instances
export const createPlanItem = (
  title: string,
  placeId?: string,
  startTime?: string,
  endTime?: string,
  notes?: string,
  durationMins?: number
): PlanItem => ({
  id: crypto.randomUUID(),
  title,
  placeId,
  startTime,
  endTime,
  notes,
  durationMins,
});

export const createDayPlan = (dateIndex: number, items: PlanItem[] = []): DayPlan => ({
  dateIndex,
  items,
});

export const createTrip = (
  ownerId: string,
  title: string,
  destination: string,
  days: number,
  startDate?: string,
  visibility: TripVisibility = 'private'
): Trip => {
  const now = new Date().toISOString();
  const plan = Array.from({ length: days }, (_, i) => createDayPlan(i));
  
  return {
    id: crypto.randomUUID(),
    title,
    destination,
    startDate,
    days,
    visibility,
    plan,
    createdAt: now,
    updatedAt: now,
    ownerId,
  };
};

// Helper functions
export const addDayToTrip = (trip: Trip): Trip => {
  const newDay = createDayPlan(trip.plan.length);
  return {
    ...trip,
    days: trip.days + 1,
    plan: [...trip.plan, newDay],
    updatedAt: new Date().toISOString(),
  };
};

export const removeDayFromTrip = (trip: Trip, dateIndex: number): Trip => {
  if (trip.days <= 1) {
    return trip; // Cannot remove the last day
  }
  
  const newPlan = trip.plan.filter(day => day.dateIndex !== dateIndex);
  
  // Reindex days
  const reindexedPlan = newPlan.map((day, index) => ({
    ...day,
    dateIndex: index,
  }));
  
  return {
    ...trip,
    days: trip.days - 1,
    plan: reindexedPlan,
    updatedAt: new Date().toISOString(),
  };
};

export const addItemToDay = (trip: Trip, dateIndex: number, item: PlanItem): Trip => {
  const newPlan = trip.plan.map(day => {
    if (day.dateIndex === dateIndex) {
      return {
        ...day,
        items: [...day.items, item],
      };
    }
    return day;
  });
  
  return {
    ...trip,
    plan: newPlan,
    updatedAt: new Date().toISOString(),
  };
};

export const removeItemFromDay = (trip: Trip, dateIndex: number, itemId: string): Trip => {
  const newPlan = trip.plan.map(day => {
    if (day.dateIndex === dateIndex) {
      return {
        ...day,
        items: day.items.filter(item => item.id !== itemId),
      };
    }
    return day;
  });
  
  return {
    ...trip,
    plan: newPlan,
    updatedAt: new Date().toISOString(),
  };
};

export const moveItemBetweenDays = (
  trip: Trip,
  itemId: string,
  sourceDayIndex: number,
  targetDayIndex: number
): Trip => {
  // Find the item to move
  const sourceDay = trip.plan.find(day => day.dateIndex === sourceDayIndex);
  if (!sourceDay) return trip;
  
  const itemToMove = sourceDay.items.find(item => item.id === itemId);
  if (!itemToMove) return trip;
  
  // Remove item from source day
  const tripWithItemRemoved = removeItemFromDay(trip, sourceDayIndex, itemId);
  
  // Add item to target day
  return addItemToDay(tripWithItemRemoved, targetDayIndex, itemToMove);
};

export const reorderItemsInDay = (
  trip: Trip,
  dateIndex: number,
  itemIds: string[]
): Trip => {
  const day = trip.plan.find(d => d.dateIndex === dateIndex);
  if (!day) return trip;
  
  // Create a map of items by id for quick lookup
  const itemsMap = new Map(day.items.map(item => [item.id, item]));
  
  // Create new ordered items array
  const orderedItems = itemIds
    .map(id => itemsMap.get(id))
    .filter(item => !!item) as PlanItem[];
  
  // Update the day with the new order
  const newPlan = trip.plan.map(d => {
    if (d.dateIndex === dateIndex) {
      return {
        ...d,
        items: orderedItems,
      };
    }
    return d;
  });
  
  return {
    ...trip,
    plan: newPlan,
    updatedAt: new Date().toISOString(),
  };
};

export const initializePackingList = (trip: Trip, items: string[] = []): Trip => {
  const packingList = items.map(item => createPackingItem(item));
  
  return {
    ...trip,
    packingList,
    updatedAt: new Date().toISOString(),
  };
};

export const initializeBudget = (trip: Trip, currency: string = 'USD'): Trip => {
  return {
    ...trip,
    budget: createBudget(currency),
    updatedAt: new Date().toISOString(),
  };
};

export const getTripDates = (trip: Trip): Date[] => {
  if (!trip.startDate) return [];
  
  const startDate = new Date(trip.startDate);
  return Array.from({ length: trip.days }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });
};

export const getTripEndDate = (trip: Trip): Date | null => {
  if (!trip.startDate) return null;
  
  const startDate = new Date(trip.startDate);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + trip.days - 1);
  return endDate;
};

export const isTripInProgress = (trip: Trip): boolean => {
  if (!trip.startDate) return false;
  
  const today = new Date();
  const startDate = new Date(trip.startDate);
  const endDate = getTripEndDate(trip);
  
  return today >= startDate && (endDate ? today <= endDate : true);
};

export const isTripUpcoming = (trip: Trip): boolean => {
  if (!trip.startDate) return false;
  
  const today = new Date();
  const startDate = new Date(trip.startDate);
  
  return today < startDate;
};

export const isTripPast = (trip: Trip): boolean => {
  if (!trip.startDate) return false;
  
  const today = new Date();
  const endDate = getTripEndDate(trip);
  
  return endDate ? today > endDate : false;
};

