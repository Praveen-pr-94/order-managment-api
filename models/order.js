const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "products"
    },
    quantity: {
        type: Number,
        default:0,
    },
    total: {
        type: Number,
        default:0,
    },
    isDeleted: {
        type: Number,
        default: 0
    },
},{timestamps: true});
const orderModel = mongoose.model('orders', orderSchema);
module.exports = orderModel;

