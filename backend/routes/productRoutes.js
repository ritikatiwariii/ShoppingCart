const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length > 0) {
            console.log('--- API RESPONSE DEBUG ---');
            console.log('First product image:', products[0].image);
        }
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed products (optional, for development)
router.post('/seed', async (req, res) => {
    try {
        const productsData = req.body; // Array of products from data.js
        await Product.deleteMany({});
        const seededProducts = await Product.insertMany(productsData);
        res.status(201).json(seededProducts);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
