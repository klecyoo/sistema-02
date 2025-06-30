import { Router } from 'express';
import {
  createConvenio,
  getConvenios,
  getConvenioById,
  updateConvenio,
  deleteConvenio,
} from '../controllers/convenioController';
import { authenticateJWT } from '../middlewares/auth';

const router = Router();

// Rotas protegidas por autenticação
router.get('/', authenticateJWT, getConvenios);
router.post('/', authenticateJWT, createConvenio);
router.get('/:id', authenticateJWT, getConvenioById);
router.put('/:id', authenticateJWT, updateConvenio);
router.delete('/:id', authenticateJWT, deleteConvenio);

export default router;