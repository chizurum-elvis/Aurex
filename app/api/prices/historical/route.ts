import { NextRequest, NextResponse } from "next/server";
// 1. Import your Mongoose connection utility and Commodity model
import { connectToDatabase } from "@/database/mongoose";
import { Commodity } from "@/database/models/Commodity";

// Helper function to generate simulated coordinates back in time
function generateSimulatedTimeline(currentPrice: number, pointsCount: number, timeframe: string) {
    const data = [];
    let movingPrice = currentPrice;
    const now = new Date();

    for (let i = pointsCount - 1; i >= 0; i--) {
        const targetDate = new Date(now.getTime());

        let dateLabel = "";
        if (timeframe === "24H") {
            targetDate.setHours(now.getHours() - i * 4);
            dateLabel = targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        } else if (timeframe === "7D") {
            targetDate.setDate(now.getDate() - i);
            dateLabel = targetDate.toLocaleDateString([], { month: 'short', day: '2-digit' });
        } else if (timeframe === "1M") {
            targetDate.setDate(now.getDate() - i * 7);
            dateLabel = `Wk ${Math.ceil(targetDate.getDate() / 7)}`;
        } else {
            targetDate.setMonth(now.getMonth() - i * 3);
            dateLabel = `Q${Math.floor(targetDate.getMonth() / 3) + 1} ${targetDate.getFullYear().toString().slice(-2)}`;
        }

        const varianceFactor = (Math.random() - 0.48) * 0.05;
        movingPrice = movingPrice * (1 + varianceFactor);

        const volumeBase = timeframe === "1Y" ? 2500 : timeframe === "1M" ? 500 : 120;
        const simulatedVolume = Math.floor(volumeBase + (Math.random() * (volumeBase * 0.5)));

        data.push({
            date: dateLabel,
            Price: Math.round(movingPrice * 100) / 100,
            volume: simulatedVolume
        });
    }

    if (data.length > 0) {
        data[data.length - 1].Price = currentPrice;
    }

    return data;
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const assetName = searchParams.get("asset") || "Gold";
        const timeframe = searchParams.get("timeframe") || "7D";

        // 2. Fire up your established Mongoose engine tool link safely
        await connectToDatabase();

        // 3. Query Mongoose model directly using standard Mongo case-insensitive or exact regex match
        const assetDocument = await Commodity.findOne({ name: new RegExp(`^${assetName}$`, 'i') });

        let liveCurrentPrice = 1250.00;

        // 4. Extract currentPrice cleanly from your type-safe model template response
        if (assetDocument && assetDocument.currentPrice) {
            liveCurrentPrice = assetDocument.currentPrice;
        } else {
            // Fallbacks in case an asset query returns null before initialization sync runs
            const basePrices: Record<string, number> = {
                Gold: 2342.80,
                Silver: 30.20,
                "Crude Oil": 79.10,
                "Natural Gas": 2.35,
                Copper: 4.60,
                Wheat: 640.50,
                Corn: 450.20,
                Cotton: 78.40,
                Sugar: 19.30,
                Coffee: 215.10
            };

            // Match key gracefully using uppercase tracker names as keys
            const uppercaseAsset = assetName.toUpperCase().replace(" BRENT", "").replace(" WTI", "I");
            liveCurrentPrice = basePrices[uppercaseAsset] || basePrices[assetName] || 1250.00;
        }

        const dataPointsMap: Record<string, number> = { "24H": 6, "7D": 7, "1M": 4, "1Y": 5 };
        const pointsCount = dataPointsMap[timeframe] || 7;

        const historicalData = generateSimulatedTimeline(liveCurrentPrice, pointsCount, timeframe);

        return NextResponse.json({
            success: true,
            asset: assetName,
            timeframe,
            currentPrice: liveCurrentPrice,
            data: historicalData
        });
    } catch (error: any) {
        console.error("Historical endpoint pipeline error details:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}