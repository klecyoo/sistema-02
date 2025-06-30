import { Router } from 'express';
import {
  createObra,
  getObras,
  getObraById,
  updateObra,
  deleteObra,
} from '../controllers/obraController';
import { authenticateJWT } from '../middlewares/auth';

const router = Router();

// Rotas protegidas por autenticação
router.get('/', authenticateJWT, getObras);
router.post('/', authenticateJWT, createObra);
router.get('/:id', authenticateJWT, getObraById);
router.put('/:id', authenticateJWT, updateObra);
router.delete('/:id', authenticateJWT, deleteObra);

export default router;