import express from "express";
import Cart from "../models/Cart.js";
import Book from "../models/Book.js";
import auth from "../middleware/auth.js";
const router = express.Router();

// Get cart items for current user
router.get("/", auth, async (req, res) => {
  try {
    const items = await Cart.find({ userId: req.userId });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add book to cart (or increment quantity)
router.post("/", auth, async (req, res) => {
  try {
    const { bookId, quantity = 1 } = req.body;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    let item = await Cart.findOne({ userId: req.userId, bookId });
    if (item) {
      item.quantity += quantity;
      await item.save();
      return res.json(item);
    }

    item = new Cart({
      userId: req.userId,
      bookId,
      title: book.bookName,
      price: book.price,
      image: book.coverImage,
      quantity
    });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update quantity
router.put("/:id", auth, async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Cart item not found" });
    if (item.userId.toString() !== req.userId) return res.status(401).json({ message: "Not authorized" });

    const { quantity } = req.body;
    item.quantity = quantity ?? item.quantity;
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete item
router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    if (item.userId.toString() !== req.userId) return res.status(401).json({ message: "Not authorized" });

    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
