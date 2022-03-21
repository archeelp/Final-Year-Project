import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
}, {
  timestamps: true
});

export default mongoose.model("Order", OrderSchema);