import { z } from 'zod';
import { DayPlanSchema } from './trip';

export const GuideSchema = z.object({
  id: z.string(),
  title: z.string(),
  destination: z.string(),
  days: z.number().int().positive(),
  tags: z.array(z.string()).default([]),
  coverImage: z.string().url().optional(),
  summary: z.string(),
  planPreview: z.array(DayPlanSchema),
  rating: z.number().min(0).max(5).optional(),
  reviews: z.number().int().nonnegative().optional(),
  author: z.string().optional(),
  createdAt: z.string(), // ISO date string
});

export type Guide = z.infer<typeof GuideSchema>;

// Factory function for creating a new guide
export const createGuide = (
  title: string,
  destination: string,
  days: number,
  summary: string,
  planPreview: any[],
  tags: string[] = [],
  coverImage?: string,
  author?: string
): Guide => {
  return {
    id: crypto.randomUUID(),
    title,
    destination,
    days,
    tags,
    coverImage,
    summary,
    planPreview,
    author,
    rating: 0,
    reviews: 0,
    createdAt: new Date().toISOString(),
  };
};

// Helper functions
export const calculateAverageRating = (ratings: number[]): number => {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((total, rating) => total + rating, 0);
  return parseFloat((sum / ratings.length).toFixed(1));
};

export const filterGuidesByTags = (guides: Guide[], tags: string[]): Guide[] => {
  if (tags.length === 0) return guides;
  return guides.filter(guide => 
    tags.some(tag => guide.tags.includes(tag))
  );
};

export const filterGuidesByDestination = (guides: Guide[], destination: string): Guide[] => {
  if (!destination) return guides;
  const lowerDestination = destination.toLowerCase();
  return guides.filter(guide => 
    guide.destination.toLowerCase().includes(lowerDestination)
  );
};

export const filterGuidesByDuration = (guides: Guide[], minDays: number, maxDays: number): Guide[] => {
  return guides.filter(guide => 
    guide.days >= minDays && guide.days <= maxDays
  );
};

export const sortGuidesByRating = (guides: Guide[], ascending: boolean = false): Guide[] => {
  return [...guides].sort((a, b) => {
    const ratingA = a.rating || 0;
    const ratingB = b.rating || 0;
    return ascending ? ratingA - ratingB : ratingB - ratingA;
  });
};

export const sortGuidesByPopularity = (guides: Guide[], ascending: boolean = false): Guide[] => {
  return [...guides].sort((a, b) => {
    const reviewsA = a.reviews || 0;
    const reviewsB = b.reviews || 0;
    return ascending ? reviewsA - reviewsB : reviewsB - reviewsA;
  });
};

