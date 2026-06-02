import { z } from 'zod';

// 1. Validates incoming query parameters for the GET /api/prices endpoint
export const PriceQuerySchema = z.object({
    category: z.string().optional(),
    region: z.string().optional(),
    search: z.string().optional(),
    limit: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : 20))
        .pipe(z.number().int().positive().max(100)),
});

// 2. Validates incoming payloads for watchlists modifications
export const WatchlistActionSchema = z.object({
    commodityId: z.string().regex(/^[0-9a-fA-F]{24}$/, {
        message: "Must be a valid 24-character hex MongoDB ObjectId",
    }),
});

export type PriceQueryInput = z.infer<typeof PriceQuerySchema>;
export type WatchlistActionInput = z.infer<typeof WatchlistActionSchema>;