const Router = require('express');
const user = require( '../api/UserManagment');
const router = Router();
router.get('/', user.list);
router.get('/:id',user.listById);
router.post('/', user.create);
router.put('/:id', user.update);
router.delete('/:id', user.delete);
module.exports = router;