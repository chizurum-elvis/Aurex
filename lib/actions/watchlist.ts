'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import mongoose from 'mongoose'; // <-- Imported mongoose for type casting
import { connectToDatabase } from '@/database/mongoose';
import { WatchlistActionSchema } from '@/lib/validations/price-schema';

export async function addToWatchlist(rawData: unknown) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error('Unauthenticated operational authorization failure');

        const validatedFields = WatchlistActionSchema.safeParse(rawData);
        if (!validatedFields.success) {
            return { success: false, error: 'Invalid Payload Parameters Provided' };
        }

        const { commodityId } = validatedFields.data;

        // Connect via Mongoose
        const mongooseInstance = await connectToDatabase();
        const db = mongooseInstance.connection.db;
        if (!db) throw new Error('Database instance unavailable');

        // Cast the incoming string ID to a real MongoDB ObjectId
        const targetObjectId = new mongoose.Types.ObjectId(commodityId);

        // Added 'as any' wrapper cast to fix the TypeScript index signature error
        await db.collection('users').updateOne(
            { clerkUserId: userId },
            {
                $addToSet: { watchlist: targetObjectId }
            } as any,
            { upsert: true }
        );

        revalidatePath('/dashboard/watchlist');
        return { success: true };

    } catch (error: any) {
        console.error('Watchlist Add Action Error:', error);
        return { success: false, error: error.message || 'Operation Execution Failure' };
    }
}

export async function removeFromWatchlist(rawData: unknown) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error('Unauthenticated operational authorization failure');

        const validatedFields = WatchlistActionSchema.safeParse(rawData);
        if (!validatedFields.success) {
            return { success: false, error: 'Invalid Payload Parameters Provided' };
        }

        const { commodityId } = validatedFields.data;

        // Connect via Mongoose
        const mongooseInstance = await connectToDatabase();
        const db = mongooseInstance.connection.db;
        if (!db) throw new Error('Database instance unavailable');

        // Cast the incoming string ID to a real MongoDB ObjectId
        const targetObjectId = new mongoose.Types.ObjectId(commodityId);

        // Added 'as any' wrapper cast to fix the TS2322 PullOperator error
        await db.collection('users').updateOne(
            { clerkUserId: userId },
            {
                $pull: { watchlist: targetObjectId }
            } as any
        );

        revalidatePath('/dashboard/watchlist');
        return { success: true };

    } catch (error: any) {
        console.error('Watchlist Remove Action Error:', error);
        return { success: false, error: error.message || 'Operation Execution Failure' };
    }
}