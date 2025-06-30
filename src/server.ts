import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import convenioRoutes from './routes/convenioRoutes'; // [Adicionar ao início do arquivo, após outras importações]
import licitacaoRoutes from './routes/licitacaoRoutes'; // [Adicionar ao início do arquivo, após outras importações]
import contratoRoutes from './routes/contratoRoutes'; // [Adicionar ao início do arquivo, após outras importações]
import obraRoutes from './routes/obraRoutes'; // [Adicionar ao início do arquivo, após outras importações]
import documentoRoutes from './routes/documentoRoutes'; // [Adicionar ao início do arquivo, após outras importações]
import prestacaoContasRoutes from './routes/prestacaoContasRoutes'; // [Adicionar ao início do arquivo, após outras importações]
import { sequelize } from './config/database';
import './models'; // Garante que associações sejam configuradas

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(cors());
app.use(express.json());

// Healthcheck endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/convenios', convenioRoutes); // [Adicionar antes de app.use('/api/auth', authRoutes);]
app.use('/api/licitacoes', licitacaoRoutes); // [Adicionar antes de app.use('/api/auth', authRoutes);]
app.use('/api/contratos', contratoRoutes); // [Adicionar antes de app.use('/api/auth', authRoutes);]
app.use('/api/obras', obraRoutes); // [Adicionar antes de app.use('/api/auth', authRoutes);]
app.use('/api/documentos', documentoRoutes); // [Adicionar antes de app.use('/api/auth', authRoutes);]
app.use('/api/prestacao-contas', prestacaoContasRoutes); // [Adicionar antes de app.use('/api/auth', authRoutes);]
app.use('/api/auth', authRoutes);

sequelize.sync().then(() => {
  app.listen(Number(PORT), HOST, () => {
    console.log(`Servidor rodando em http://${HOST}:${PORT}`);
  });
}).catch((err) => {
  console.error('Erro ao conectar/sincronizar com o banco de dados:', err);
});