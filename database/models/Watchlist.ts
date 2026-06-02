import { Schema, models, model } from "mongoose";

const WatchlistSchema = new Schema({
    userId: {
        type: String, // Connects to your logged-in Auth User ID (e.g., Clerk or Auth.js ID)
        required: true,
        index: true
    },
    commodityIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Commodity' // Array of references to the commodities they pinned
    }]
});

export const Watchlist = models.Watchlist || model('Watchlist', WatchlistSchema);