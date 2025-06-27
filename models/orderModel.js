import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: { type: String, required: true }, 
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  amount: {
    type: Number,
    required: true
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ["Food Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Food Processing"
  },
  payment: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default orderModel;
