import { z } from 'zod';
import { dayPlanSchema } from './trip.schema';

// Guide schema
export const guideSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  destination: z.string().min(1),
  days: z.number().int().positive(),
  tags: z.array(z.string()),
  coverImage: z.string().url(),
  summary: z.string().min(1),
  planPreview: z.array(dayPlanSchema),
});

