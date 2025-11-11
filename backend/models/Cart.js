import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId:   { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  title:    { type: String, required: true },
  price:    { type: Number, required: true },
  image:    { type: String },
  quantity: { type: Number, default: 1 }
}, { timestamps: true });

export default mongoose.model("Cart", cartItemSchema);
