const Router = require('express');
const order = require('../api/OrderManagment');
const router = Router();
router.get('/search', order.search);
router.get('/', order.list);
router.get('/:id',order.listById);
router.post('/', order.create);
router.put('/:id', order.update);
router.delete('/:id', order.delete);

module.exports = router;