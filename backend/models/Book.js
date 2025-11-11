import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  bookName:    { type: String, required: true },
  author:      { type: String, default: "Unknown" },
  genre:       { type: String, default: "General" },
  description: { type: String, default: "" },
  price:       { type: Number, required: true, default: 0 },
  coverImage:  { type: String, default: "/images/default-book.jpg" } // URL served from frontend/public/images
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);
