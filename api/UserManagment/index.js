const e = require('express');
const users = require('../../models/users');
module.exports = {
    list : async(req, res) => {
        try {
            const data = await users.find({isDeleted: 0}).exec();
            return res.send({status: true, message: '', data})
        } catch(err) {
            return res.send({status: false, message: 'internal server error'})
        }
    },
    listById: async(req, res) => {
        try {
            const {id} = req.params;
            const data = await users.findById(id).exec();
            return res.send({status: true, message: '', data})
        } catch(err) {
            return res.send({status: false, message: 'internal server error'})
        }
    },
    create : async(req, res) => {
        try {
            const data = await users.create(req.body);
            return res.send({status: true, message: 'user created successfully'})
        } catch(err) {
            return res.send({status: false, message: 'internal server error'})
        }
    },
    update: async(req, res) => {
        try {
            const {id} = req.params;
            const user = await users.findById(id).exec();
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            await user.save();
            return res.send({status: true, message: 'user updated successfully', data:''})
        } catch(err) {
            console.error(err)
            return res.send({status: false, message: 'internal server error'})
        }
    },
    delete: async(req, res) => {
        try {
            const {id} = req.params;
            const user = await users.findById(id).exec();
            user.isDeleted = 1;
            await user.save();
            return res.send({status: true, message: 'user deleted successfully' , data:''})
        } catch(err) {
            return res.send({status: false, message: 'internal server error'})
        }
    }
}