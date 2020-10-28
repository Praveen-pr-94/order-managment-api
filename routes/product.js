const Router = require('express');
const product = require('../api/ProductManagment');
const router = Router();
router.get('/', product.list);
router.get('/:id',product.listById);
router.post('/', product.create);
router.put('/:id', product.update);
router.delete('/:id', product.delete);
module.exports = router;