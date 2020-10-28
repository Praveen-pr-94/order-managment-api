const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default:0,
    },
    isDeleted: {
        type: Number,
        default: 0
    },
},{timestamps: true});
const productModel = mongoose.model('products', productSchema);
module.exports = productModel;

