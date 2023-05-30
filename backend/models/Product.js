import mongoose from "mongoose";
import boolean from "webidl-conversions"
const ProductSchema = new mongoose.Schema({

    name: { type: String, required: true, },
    prices: {
        type: Array,
        required: true
    },
    variants: [{ type: String, required: true }],

    category: { type: String, required: true, },
    image: { type: String, },
    description: { type: String, required: true, }


}, { timestamps: true })

export default mongoose.model("Product", ProductSchema)