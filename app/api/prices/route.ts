import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/database/mongoose'; // Your connection function
import { PriceQuerySchema } from '@/lib/validations/price-schema';

export async function GET(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized Access' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const queryData = {
            category: searchParams.get('category') || undefined,
            region: searchParams.get('region') || undefined,
            search: searchParams.get('search') || undefined,
            limit: searchParams.get('limit') || '20',
        };

        const validationResult = PriceQuerySchema.safeParse(queryData);
        if (!validationResult.success) {
            return NextResponse.json({
                error: 'Invalid Query Parameters Passed',
                details: validationResult.error.flatten()
            }, { status: 400 });
        }

        const { category, region, search, limit } = validationResult.data;

        // 1. Establish/Retrieve cached Mongoose connection
        const mongooseInstance = await connectToDatabase();
        const db = mongooseInstance.connection.db;

        if (!db) throw new Error('Database instance unavailable');

        const matchFilters: any = {};
        if (category) matchFilters.category = category;
        if (region) matchFilters.region = region;
        if (search) {
            matchFilters.name = { $regex: search, $options: 'i' };
        }

        const commodities = await db
            .collection('commodities')
            .find(matchFilters)
            .sort({ name: 1 })
            .limit(limit)
            .toArray();

        return NextResponse.json({ commodities }, { status: 200 });

    } catch (error) {
        console.error('Error in GET /api/prices:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


