import express from "express";
import Book from "../models/Book.js";
import auth from "../middleware/auth.js";
const router = express.Router();

// Get all books (public)
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get single book
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Not found" });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// (Optional admin) Create new book - you can restrict later
router.post("/", async (req, res) => {
  try {
    const { bookName, author, genre, description, price, coverImage } = req.body;
    const book = new Book({ bookName, author, genre, description, price, coverImage });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// (Optional admin) Delete book
router.delete("/:id", auth, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
