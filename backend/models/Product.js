const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: {
        rate: { type: Number },
        count: { type: Number }
    }
}, {
    toJSON: {
        transform: function (doc, ret) {
            if (ret.image && !ret.image.startsWith('http')) {
                ret.image = `https://fakestoreapi.com${ret.image.startsWith('/') ? '' : '/'}${ret.image}`;
            }
            return ret;
        }
    },
    toObject: {
        transform: function (doc, ret) {
            if (ret.image && !ret.image.startsWith('http')) {
                ret.image = `https://fakestoreapi.com${ret.image.startsWith('/') ? '' : '/'}${ret.image}`;
            }
            return ret;
        }
    }
});

module.exports = mongoose.model('Product', productSchema);
