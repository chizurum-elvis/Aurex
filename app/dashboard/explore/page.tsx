import { connectToDatabase } from "@/database/mongoose";
import { Commodity } from "@/database/models/Commodity";
import { Watchlist } from "@/database/models/Watchlist";
import MarketExploreTable from "@/components/MarketExploreTable";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function ExplorePage() {
    // 1. Authenticate the session dynamically server-side
    let userId: string | null = null;

    const session = await auth();
    userId = session?.userId || null;

    // 🛑 Production Security Gate
    if (!userId) {
        redirect("/login");
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
        // 🌟 ADAPTIVE CONTENT LAYOUT: Changes padding from p-4 on mobile devices up to p-6 on desktop views
        <div className="p-4 sm:p-6 bg-zinc-950 min-h-screen space-y-6 antialiased selection:bg-violet-500/30 w-full overflow-hidden">

            {/* TEXT ROW HEADER BAR */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
                    Global Markets
                </h1>
                <p className="text-xs text-zinc-500 mt-1 font-medium leading-relaxed">
                    Discover and toggle live data assets to build your personalized grid environment.
                </p>
            </div>

            {/* 🌟 OVERFLOW SECURITY WRAPPER */}
            {/* This ensures that if the nested table inside `<MarketExploreTable />` expands beyond the
                screen space on tiny devices, it will scroll independently horizontally without breaking your dashboard grid view! */}
            <div className="w-full overflow-x-auto rounded-2xl border border-zinc-900 bg-zinc-900/10 scrollbar-thin">
                <MarketExploreTable
                    initialCommodities={formattedCommodities}
                    userPinnedIds={pinnedIds}
                />
            </div>
        </div>
    );
}