import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: [
            {
                menuId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Menu"
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: [1, "Quantity must be at least 1"]
                }
            }
        ],

        totalPrice: {
            type: Number,
            required: true,
            min: [0, "Total price cannot be negative"]
        },

        pickupTime: {
            type: String,
            required: true
        },

        status: {
            type: String,
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Order", orderSchema);