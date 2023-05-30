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
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
    ,
    userID: {
        type: String,
        required: false

    }


}, { timestamps: true })

export default mongoose.model("Carts", CartSchema)