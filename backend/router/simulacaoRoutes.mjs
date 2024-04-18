// simulacaoRouter.mjs
import express from 'express';
const router = express.Router();
import SimulacaoController from '../controller/simulacaoController.mjs';

router.post('/', SimulacaoController.insertSimulation);
router.get('/', SimulacaoController.getAll);
router.delete('/:id_sim', SimulacaoController.deleteSimulation)

export default router;
