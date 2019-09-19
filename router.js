const Router = require('koa-router');
const ctrl = require('./controller.js');

const router = new Router();

router.get('/todos', ctrl.getAll);
router.post('/post/:user', ctrl.createToDo);
router.put('/complete/:id', ctrl.completeToDo);
router.delete('/delete/:id', ctrl.deleteToDO);


module.exports = router;
