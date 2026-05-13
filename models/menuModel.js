import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true  
        },

        price: {
            type: Number,
            required: true,
            min: [0, "Price cannot be negative"]
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        availability: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Menu", menuSchema);