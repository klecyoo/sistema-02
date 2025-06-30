import { Router } from 'express';
import {
  createLicitacao,
  getLicitacoes,
  getLicitacaoById,
  updateLicitacao,
  deleteLicitacao,
} from '../controllers/licitacaoController';
import { authenticateJWT } from '../middlewares/auth';

const router = Router();

// Rotas protegidas por autenticação
router.get('/', authenticateJWT, getLicitacoes);
router.post('/', authenticateJWT, createLicitacao);
router.get('/:id', authenticateJWT, getLicitacaoById);
router.put('/:id', authenticateJWT, updateLicitacao);
router.delete('/:id', authenticateJWT, deleteLicitacao);

export default router;