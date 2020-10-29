const e = require('express');
const users = require('../../models/users');
module.exports = {
    /***
     *  List all users
     * **/
    list : async(req, res) => {
        try {
            const data = await users.find({isDeleted: 0}).exec();
            return res.send({status: true, message: '', data})
        } catch(err) {
            return res.send({status: false, message: 'internal server error'})
        }
    },
    /***
     *  List users by id
     * **/
    listById: async(req, res) => {
        try {
            const {id} = req.params;
            const data = await users.findById(id).exec();
            return res.send({status: true, message: '', data})
        } catch(err) {
            return res.send({status: false, message: 'internal server error'})
        }
    },
    /***
     *  Create new user
     * **/
    create : async(req, res) => {
        try {
            const data = await users.create(req.body);
            return res.send({status: true, message: 'user created successfully'})
        } catch(err) {
            return res.send({status: false, message: 'internal server error'})
        }
    },
    /***
     *  Update user by user id
     * **/
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
    /****
     *  Delete user by user id
     * **/
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