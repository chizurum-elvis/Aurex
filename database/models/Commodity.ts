import { ICommodity} from '@/types'
import {Schema, models, model} from "mongoose";

const CommoditySchema = new Schema<ICommodity>({
    ticker: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    category: { type: String, required: true, index: true },
    region: { type: String, required: true, index: true },
    currentPrice: { type: Number, required: true },
}, { timestamps: true });

export const Commodity = models.Commodity || model<ICommodity>('Commodity', CommoditySchema);