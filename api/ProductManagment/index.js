const product = require('../../models/product');
module.exports = {
    /***
     *  List all products
     * **/
    list : async(req, res) => {
        try {
            const data = await product.find({isDeleted: 0}).exec();
            return res.send({status: true, message: '' , data})
        } catch(err) {
            return res.send({status: false, message: 'internal server error'})
        }
    },
    /***
     *  List products by product id
     * **/
    listById: async(req, res) => {
        try {
            const {id} = req.params;
            const data = await product.findById(id).exec();
            return res.send({status: true, message: '', data})
        } catch(err) {
            return res.send({status: false, message: 'internal server error'})
        }
    },
    /***
     *  Create new product
     * **/
    create : async(req, res) => {
        try {
            const data = await product.create(req.body);
            return res.send({status: true, message: 'product created successfully'})
        } catch(err) {
            return res.send({status: false, message: 'internal server error'})
        }
    },
    /***
     *  Update product by product id
     * **/
    update: async(req, res) => {
        try {
            const {id} = req.params;
            const products = await product.findById(id).exec();
            products.productName = req.body.productName;
            products.price = req.body.price;
            await products.save();
            return res.send({status: true, message: 'product updated successfully', data:''})
        } catch(err) {
            return res.send({status: false, message: 'internal server error'})
        }
    },
    /***
     *  Delete product by product id 
     * **/
    delete: async(req, res) => {
        try {
            const {id} = req.params;
            const products = await product.findById(id).exec();
            products.isDeleted = 1;
            await products.save();
            return res.send({status: true, message: 'product deleted successfully' , data:''})
        } catch(err) {
            return res.send({status: false, message: 'internal server error'})
        }
    }
}