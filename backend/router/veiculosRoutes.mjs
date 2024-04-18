// veiculosRouter.mjs
import express from 'express';
const router = express.Router();
import veiculosController from '../controller/veiculosContoller.mjs';

router.get('/', veiculosController.getAll);
router.get('/:id', veiculosController.getById);
router.post('/', veiculosController.create);
router.put('/:id', veiculosController.update);
router.delete('/:id', veiculosController.delete);

export default router;
