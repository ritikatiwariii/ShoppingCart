const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

const Product = require('../models/Product');

// Get all cart items with product details
router.get('/', async (req, res) => {
    try {
        const cartItems = await Cart.find();
        const cartWithDetails = await Promise.all(cartItems.map(async (item) => {
            const product = await Product.findOne({ id: item.productId });
            return {
                ...item._doc,
                ...(product ? product.toJSON() : {})
            };
        }));
        res.json(cartWithDetails);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add item to cart
router.post('/', async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cartItem = await Cart.findOne({ productId });
        if (cartItem) {
            cartItem.quantity += (quantity || 1);
        } else {
            cartItem = new Cart({ productId, quantity: quantity || 1 });
        }
        const savedItem = await cartItem.save();
        const product = await Product.findOne({ id: productId });
        res.status(201).json({ ...savedItem._doc, ...(product ? product.toJSON() : {}) });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update cart item quantity
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await Cart.findOneAndUpdate(
            { productId: req.params.id },
            { quantity: req.body.quantity },
            { new: true }
        );
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Remove item from cart
router.delete('/:id', async (req, res) => {
    try {
        await Cart.findOneAndDelete({ productId: req.params.id });
        res.json({ message: 'Item removed from cart' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
