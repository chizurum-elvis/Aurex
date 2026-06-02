import { Schema, models, model} from "mongoose";
import { IPriceHistory} from "@/types";

const PriceHistorySchema = new Schema<IPriceHistory>({
    commodityId: { type: Schema.Types.ObjectId, ref: 'Commodity', required: true, index: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true, default: 'USD' },
    timestamp: { type: Date, required: true, index: true }
});

PriceHistorySchema.index({ commodityId: 1, timestamp: -1 });
export const PriceHistory = models.PriceHistory || model<IPriceHistory>('PriceHistory', PriceHistorySchema);
