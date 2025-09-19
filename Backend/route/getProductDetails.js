const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products
router.get('/products', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET allowed categories
router.get('/products/categories', (req, res) => {
  try {
    const categories = Product.CATEGORIES || [];
    res.status(200).json({ categories });
  } catch (err) {
    console.error('Failed to get categories', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single product by ID
router.get('/products/:id', async (req, res) => {
  const { id } = req.params;

  // // Optional: Validate ObjectId
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).json({ message: "Invalid product ID" });
  // }

  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new product (admin/seller)
router.post('/products', async (req, res) => {
  try {
    const { name, description, price, image, sellerId, category } = req.body;
    if (!name || price === undefined || !sellerId) return res.status(400).json({ message: 'Missing required fields' });
    const product = await Product.create({ name, description, price, image, sellerId, category });
    res.status(201).json(product);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product by id
router.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updates = req.body;
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;