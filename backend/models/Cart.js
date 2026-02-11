const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productId: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    // You could also store a reference to a User if authentication was added
});

module.exports = mongoose.model('Cart', cartSchema);
