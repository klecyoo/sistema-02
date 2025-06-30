import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  uploadPrestacaoContasDocumento,
  getPrestacaoContasDocumentos,
  downloadPrestacaoContasDocumento,
  deletePrestacaoContasDocumento,
  gerarRelatorioPrestacaoContas,
} from '../controllers/prestacaoContasController';
import { authenticateJWT } from '../middlewares/auth';

// Configuração do Multer para upload de arquivos de prestação de contas
const uploadDir = path.join(__dirname, '../../uploads/prestacao_contas');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadDir);
  },
  filename: function (_req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + '-' + file.originalname.replace(/\s+/g, '_'));
  },
});
const upload = multer({ storage });

const router = Router();

// Upload de documento de prestação de contas
router.post('/upload', authenticateJWT, upload.single('file'), uploadPrestacaoContasDocumento);

// Listar documentos de prestação de contas por convenioId
router.get('/', authenticateJWT, getPrestacaoContasDocumentos);

// Download de documento de prestação de contas por ID
router.get('/download/:id', authenticateJWT, downloadPrestacaoContasDocumento);

// Remover documento de prestação de contas por ID
router.delete('/:id', authenticateJWT, deletePrestacaoContasDocumento);

// Gerar relatório PDF de prestação de contas (endpoint placeholder)
router.get('/relatorio/:convenioId', authenticateJWT, gerarRelatorioPrestacaoContas);

export default router;