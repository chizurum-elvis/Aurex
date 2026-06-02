import { NextResponse } from "next/server";
import { connectToDatabase } from "@/database/mongoose";
import { Watchlist } from "@/database/models/Watchlist";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
    try {
        // 1. Parse incoming request parameters safely before allocating database computational weight
        const { commodityId } = await request.json();

        if (!commodityId) {
            return NextResponse.json(
                { success: false, error: "Bad Request. Target commodityId parameter is missing." },
                { status: 400 }
            );
        }

        // 2. Establish connection infrastructure with the Atlas cluster
        await connectToDatabase();

        // 3. Dynamically extract the identity tracking key belonging to the verified session
        let userId: string | null = null;

        // --- CLERK SESSION EXTRACTION ENGINE ---
        const session = await auth();
        userId = session?.userId || null;


        // 🛑 Production Safety Gate: Refuse unauthorized data modification mutations
        if (!userId) {
            return NextResponse.json(
                { success: false, error: "Unauthorized. Action blocked due to invalid credentials." },
                { status: 401 }
            );
        }

        // 4. Retrieve or dynamically construct the user's personal watchlist document record
        let userWatchlist = await Watchlist.findOne({ userId });

        if (!userWatchlist) {
            userWatchlist = await Watchlist.create({
                userId: userId,
                commodityIds: []
            });
        }

        // 5. Compute structural mutation context (Push to add, or Splice to remove)
        const index = userWatchlist.commodityIds.indexOf(commodityId);
        let currentStateAction = "";

        if (index > -1) {
            // Asset exists in their personal array registry -> Splice it out (Unpin action)
            userWatchlist.commodityIds.splice(index, 1);
            currentStateAction = "removed";
        } else {
            // Asset is not in their registry yet -> Push it to the tracking collection array (Pin action)
            userWatchlist.commodityIds.push(commodityId);
            currentStateAction = "added";
        }

        // 6. Persist changes down to the cluster
        await userWatchlist.save();

        return NextResponse.json(
            {
                success: true,
                action: currentStateAction,
                message: `Asset matrix target completely updated: ${currentStateAction}.`
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("Critical watchlist toggle array mutation crash:", error);
        return NextResponse.json(
            { success: false, error: "Internal server payload pipeline failure." },
            { status: 500 }
        );
    }
}