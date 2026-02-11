const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const Product = require('./models/Product');
const productsData = require('./data');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shoppingcart';

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('Successfully connected to MongoDB');

        // Auto-seed if database is empty
        const count = await Product.countDocuments();
        if (count === 0) {
            console.log('Database is empty. Seeding initial products...');

            const productsWithAbsoluteUrls = productsData.map(p => ({
                ...p,
                image: p.image.startsWith('http') ? p.image : `https://fakestoreapi.com${p.image.startsWith('/') ? '' : '/'}${p.image}`
            }));

            await Product.insertMany(productsWithAbsoluteUrls);
            console.log('DATABASE SEEDED SUCCESSFULLY with', productsWithAbsoluteUrls.length, 'products.');
        }

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
