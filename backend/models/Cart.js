import mongoose from "mongoose";
import boolean from "webidl-conversions"
const CartSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    single: {
        type: Number,
        required: true
    },
    variant: {
        type: String,
        required: true

    },
    price: {
        type: Number,
        required: true
    }
    ,
    userID: {
        type: String,
        required: false

    }


}, { timestamps: true })

export default mongoose.model("Carts", CartSchema)