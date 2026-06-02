import { connectToDatabase } from "@/database/mongoose";
import { Commodity } from "@/database/models/Commodity";
import { Watchlist } from "@/database/models/Watchlist";
import MarketExploreTable from "@/components/MarketExploreTable";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server"; // For Clerk Architecture

export default async function ExplorePage() {
    // 1. Authenticate the session dynamically server-side
    let userId: string | null = null;

    // --- CLERK SESSION EXTRACTION ENGINE ---
    const session = await auth();
    userId = session?.userId || null;


    // 🛑 Production Security Gate: Kick unauthenticated traffic out of the dashboard
    if (!userId) {
        redirect("/login"); // Redirects securely on the server-side before anything loads
    }

    // 2. Establish connection infrastructure with the Atlas cluster
    await connectToDatabase();

    // 3. Fetch EVERY commodity inside the master collection using lean queries for maximum speed
    const allCommodities = await Commodity.find({}).lean();

    // 4. Retrieve this user's current personalized watchlist record
    const userWatchlist = await Watchlist.findOne({ userId });

    // Extract mapped string configurations of the ObjectIDs they already follow
    const pinnedIds = userWatchlist
        ? userWatchlist.commodityIds.map((id: any) => id.toString())
        : [];

    // 5. Clean up MongoDB documents into lightweight standard JS objects for the Client Component
    const formattedCommodities = allCommodities.map((doc: any) => ({
        _id: doc._id.toString(),
        ticker: doc.ticker,
        name: doc.name,
        category: doc.category,
        currentPrice: doc.currentPrice
    }));

    return (
        <div className="p-6 bg-zinc-950 min-h-screen space-y-4 antialiased selection:bg-violet-500/30">
            <div>
                <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
                    Global Markets
                </h1>
                <p className="text-xs text-zinc-500 mt-1 font-medium">
                    Discover and toggle live data assets to build your personalized grid environment.
                </p>
            </div>

            {/* Render your client-side pinning engine table interface */}
            <MarketExploreTable
                initialCommodities={formattedCommodities}
                userPinnedIds={pinnedIds}
            />
        </div>
    );
}