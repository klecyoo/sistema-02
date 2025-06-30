import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  uploadDocumento,
  getDocumentosByEntidade,
  getDocumentoById,
  downloadDocumento,
  deleteDocumento,
} from '../controllers/documentoController';
import { authenticateJWT } from '../middlewares/auth';

// Configuração do Multer para upload de arquivos
const uploadDir = path.join(__dirname, '../../uploads');
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

// Upload de documento
router.post('/upload', authenticateJWT, upload.single('file'), uploadDocumento);

// Listar documentos por entidade e entidadeId (query params)
router.get('/', authenticateJWT, getDocumentosByEntidade);

// Buscar documento por ID
router.get('/:id', authenticateJWT, getDocumentoById);

// Download de documento
router.get('/download/:id', authenticateJWT, downloadDocumento);

// Remover documento
router.delete('/:id', authenticateJWT, deleteDocumento);

export default router;