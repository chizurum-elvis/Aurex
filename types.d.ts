import { Document, Schema} from "mongoose";

export interface ICommodity extends  Document{
    _id: string;
    ticker: string;       // e.g., "XAU" (Gold), "BZ" (Brent Crude)
    name: string;         // e.g., "Gold", "Brent Crude"
    category: string;     // e.g., "Metals", "Energy", "Agriculture"
    region: string;       // e.g., "US-GLOBAL", "EU-MARKETS"
    currentPrice: number; // Fast-access denormalized latest rate
    updatedAt: Date;
}

export interface IPriceHistory extends Document {
    commodityId: Schema.Types.ObjectId;
    price: number;
    currency: string;     // Default "USD"
    timestamp: Date;
}


export interface WatchlistItem {
    id: string;
    ticker: string;
    name: string;
    category: "Metals" | "Energy" | "Agriculture";
    currentPrice: number;
    change24h: number;
    sparkline: { val: number }[];
    marketCap: string;
    volume24h: string;
    volatility: "Low" | "Medium" | "High";
    region: string;
}

export interface CommodityRow {
    _id: string;
    ticker: string;
    name: string;
    category: string;
    currentPrice: number;
}

export interface MarketTableProps {
    initialCommodities: CommodityRow[];
    userPinnedIds: string[];
}

export interface IdentityContextType {
    displayName: string;
    setDisplayName: (name: string) => Promise<{ success: boolean; error?: string }>;
}

export interface LogoProps {
    height?: number; // Normalized to 20px by default for a perfect, professional micro-scale feel
    className?: string;
}

export interface AuthControlsProps {
    signInLabel?: string;
    signUpLabel?: string;
}

export interface UserProfileStore {
    customDisplayNames: Record<string, string>; // Maps user IDs to custom strings
    setDisplayNameForUser: (userId: string, newName: string) => void;
}

export interface ChartCanvasProps {
    activeMetric: string;
    data: any[];
}