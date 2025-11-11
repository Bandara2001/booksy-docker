import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./models/Book.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const books = [
  {
    bookName: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    description: "A mystical story of a shepherd who dreams of treasure.",
    price: 950,
    coverImage: "/images/alchemist.jpg"
  },
  {
    bookName: "Atomic Habits",
    author: "James Clear",
    genre: "Self-help",
    description: "Small habits make a big difference.",
    price: 1200,
    coverImage: "/images/atomic-habits.jpg"
  },
  {
    bookName: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Classic",
    description: "A story about manners and matrimonial machinations.",
    price: 800,
    coverImage: "/images/pride-prejudice.jpg"
  }
];

await Book.deleteMany({});
await Book.insertMany(books);
console.log("Seed complete");
process.exit(0);
