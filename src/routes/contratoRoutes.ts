import { Router } from 'express';
import {
  createContrato,
  getContratos,
  getContratoById,
  updateContrato,
  deleteContrato,
} from '../controllers/contratoController';
import { authenticateJWT } from '../middlewares/auth';

const router = Router();

// Rotas protegidas por autenticação
router.get('/', authenticateJWT, getContratos);
router.post('/', authenticateJWT, createContrato);
router.get('/:id', authenticateJWT, getContratoById);
router.put('/:id', authenticateJWT, updateContrato);
router.delete('/:id', authenticateJWT, deleteContrato);

export default router;