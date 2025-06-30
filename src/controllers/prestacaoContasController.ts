import { Request, Response } from 'express';
import { Documento } from '../models/Documento';
import path from 'path';
import fs from 'fs';
// Para geração de PDF, futuramente importar o utilitário de PDF (pdfGenerator)

export const uploadPrestacaoContasDocumento = async (req: Request, res: Response) => {
  try {
    const { convenioId } = req.body;
    if (!req.file || !convenioId) {
      return res.status(400).json({ error: 'Arquivo e convenioId são obrigatórios.' });
    }

    const documento = await Documento.create({
      nome: req.file.originalname,
      caminho: req.file.path,
      tipo: req.file.mimetype,
      entidade: 'PrestacaoContas',
      entidadeId: convenioId,
      uploadedBy: req.user?.id,
    });

    return res.status(201).json(documento);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao fazer upload do documento.' });
  }
};

export const getPrestacaoContasDocumentos = async (req: Request, res: Response) => {
  try {
    const { convenioId } = req.query;
    if (!convenioId) {
      return res.status(400).json({ error: 'convenioId é obrigatório.' });
    }
    const docs = await Documento.findAll({
      where: { entidade: 'PrestacaoContas', entidadeId: convenioId },
    });
    return res.json(docs);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar documentos de prestação de contas.' });
  }
};

export const downloadPrestacaoContasDocumento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doc = await Documento.findByPk(id);
    if (!doc || doc.entidade !== 'PrestacaoContas') {
      return res.status(404).json({ error: 'Documento não encontrado.' });
    }
    return res.download(path.resolve(doc.caminho), doc.nome);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao baixar documento.' });
  }
};

export const deletePrestacaoContasDocumento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doc = await Documento.findByPk(id);
    if (!doc || doc.entidade !== 'PrestacaoContas') {
      return res.status(404).json({ error: 'Documento não encontrado.' });
    }
    if (fs.existsSync(doc.caminho)) {
      fs.unlinkSync(doc.caminho);
    }
    await doc.destroy();
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao remover documento.' });
  }
};

// Endpoint de geração de relatório PDF (placeholder, implementar pdfGenerator futuramente)
export const gerarRelatorioPrestacaoContas = async (req: Request, res: Response) => {
  try {
    // Aqui a lógica de geração de PDF será implementada futuramente
    return res.status(501).json({ error: 'Geração de relatório PDF ainda não implementada.' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao gerar relatório de prestação de contas.' });
  }
};