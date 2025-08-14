import { v4 as uuidv4 } from 'uuid';
import { 
  Budget, 
  BudgetCategory, 
  ChecklistItem, 
  DayPlan, 
  PackingItem, 
  PlanItem, 
  Trip, 
  TripVisibility 
} from '../models';

/**
 * Create a new checklist item
 */
export function createChecklistItem(overrides: Partial<ChecklistItem> = {}): ChecklistItem {
  return {
    id: uuidv4(),
    text: 'Checklist item',
    done: false,
    ...overrides,
  };
}

/**
 * Create a new packing item
 */
export function createPackingItem(overrides: Partial<PackingItem> = {}): PackingItem {
  return {
    id: uuidv4(),
    text: 'Packing item',
    done: false,
    ...overrides,
  };
}

/**
 * Create a new plan item
 */
export function createPlanItem(overrides: Partial<PlanItem> = {}): PlanItem {
  return {
    id: uuidv4(),
    placeId: 'place123',
    title: 'Visit attraction',
    durationMins: 120,
    ...overrides,
  };
}

/**
 * Create a new day plan
 */
export function createDayPlan(overrides: Partial<DayPlan> = {}): DayPlan {
  return {
    dateIndex: 0,
    items: [createPlanItem(), createPlanItem()],
    ...overrides,
  };
}

/**
 * Create a new budget category
 */
export function createBudgetCategory(overrides: Partial<BudgetCategory> = {}): BudgetCategory {
  return {
    name: 'Accommodation',
    amount: 500,
    ...overrides,
  };
}

/**
 * Create a new budget
 */
export function createBudget(overrides: Partial<Budget> = {}): Budget {
  return {
    currency: 'USD',
    planned: [
      createBudgetCategory({ name: 'Accommodation', amount: 500 }),
      createBudgetCategory({ name: 'Transportation', amount: 300 }),
      createBudgetCategory({ name: 'Food', amount: 400 }),
      createBudgetCategory({ name: 'Activities', amount: 200 }),
    ],
    ...overrides,
  };
}

/**
 * Create a new trip
 */
export function createTrip(overrides: Partial<Trip> = {}): Trip {
  return {
    id: uuidv4(),
    title: 'Trip to Paris',
    destination: 'Paris, France',
    days: 5,
    visibility: TripVisibility.PRIVATE,
    plan: [
      createDayPlan({ dateIndex: 0 }),
      createDayPlan({ dateIndex: 1 }),
      createDayPlan({ dateIndex: 2 }),
      createDayPlan({ dateIndex: 3 }),
      createDayPlan({ dateIndex: 4 }),
    ],
    packingList: [
      createPackingItem({ text: 'Passport', category: 'Documents' }),
      createPackingItem({ text: 'Camera', category: 'Electronics' }),
      createPackingItem({ text: 'Comfortable shoes', category: 'Clothing' }),
    ],
    budget: createBudget(),
    ...overrides,
  };
}

