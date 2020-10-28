const order = require('../../models/order');
const moment = require('moment');
module.exports = {
    list : async(req, res) => {
        try {
            const data = await order.find({isDeleted: 0}).populate('user product').exec();
            return res.send({status: true, message: '', data})
        } catch(err) {
            return res.send({status: false, message: 'internal server error'})
        }
    },
    listById: async(req, res) => {
        try {
            const {id} = req.params;
            const data = await order.findById(id).populate('user product').exec();
            return res.send({status: true, message: '', data})
        } catch(err) {
            return res.send({status: false, message: 'internal server error'})
        }
    },
    create : async(req, res) => {
        try {
            const data = await order.create(req.body);
            return res.send({status: true, message: 'order created successfully'})
        } catch(err) {
            return res.send({status: false, message: 'internal server error'})
        }
    },
    update: async(req, res) => {
        try {
            const {id} = req.params;
            const orders = await order.findById(id).exec();
            orders.user = req.body.user;
            orders.product = req.body.product;
            orders.quantity = req.body.quantity;
            orders.total = req.body.total;
            await orders.save();
            return res.send({status: true, message: 'order updated successfully', data:''})
        } catch(err) {
            return res.send({status: false, message: 'internal server error'})
        }
    },
    delete: async(req, res) => {
        try {
            const {id} = req.params;
            const orders = await order.findById(id).exec();
            orders.isDeleted = 1;
            await orders.save();
            return res.send({status: true, message: 'order deleted successfully' , data:''})
        } catch(err) {
            return res.send({status: false, message: 'internal server error'})
        }
    },
    search : async(req, res) => {
        try {
            const pageOptions = {
                page: parseInt(req.query.page, 10) || 0,
                limit: parseInt(req.query.limit, 10) || 10
            }
            const condition1 = req.query.search ? searchByDate(req.query.search) : {};
            const data = await order.find({...condition1 , isDeleted:0})
                .skip(pageOptions.page * pageOptions.limit)
                .limit(pageOptions.limit)
                .exec();
            return res.send({status: true, message: '', data})
        } catch(err) {
            return res.send({status: false, message: 'internal server error'})
        }
    },
}

 function searchByDate(search) {
    let condition = {};
    let today;
    switch(search){
        case 'lastWeek':
            today = moment();
            condition = { createdAt: {
                $gte:  moment(today).subtract(7, 'days').toDate(),
                $lte: today.toDate()
            }};
            break;
        case 'today':
            today = moment().startOf('day');
            condition = { createdAt: {
                $gte: today.toDate(),
                $lte: moment(today).endOf('day').toDate()
            }};
            break;
    }
    return condition;
}