const Router = require('express');
const router = Router();
router.use('/order', require('./order'));
router.use('/user', require('./user'));
router.use('/product', require('./product'));
module.exports = router;