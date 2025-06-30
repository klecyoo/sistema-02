import { Request, Response } from 'express';
import { Documento } from '../models/Documento';
import path from 'path';
import fs from 'fs';

export const uploadDocumento = async (req: Request, res: Response) => {
  try {
    const { entidade, entidadeId } = req.body;
    if (!req.file || !entidade || !entidadeId) {
      return res.status(400).json({ error: 'Arquivo, entidade e entidadeId são obrigatórios.' });
    }

    const documento = await Documento.create({
      nome: req.file.originalname,
      caminho: req.file.path,
      tipo: req.file.mimetype,
      entidade,
      entidadeId,
      uploadedBy: req.user?.id,
    });

    return res.status(201).json(documento);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao fazer upload do documento.' });
  }
};

export const getDocumentosByEntidade = async (req: Request, res: Response) => {
  try {
    const { entidade, entidadeId } = req.query;
    if (!entidade || !entidadeId) {
      return res.status(400).json({ error: 'entidade e entidadeId são obrigatórios.' });
    }
    const docs = await Documento.findAll({
      where: { entidade, entidadeId },
    });
    return res.json(docs);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar documentos.' });
  }
};

export const getDocumentoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doc = await Documento.findByPk(id);
    if (!doc) {
      return res.status(404).json({ error: 'Documento não encontrado.' });
    }
    return res.json(doc);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar documento.' });
  }
};

export const downloadDocumento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doc = await Documento.findByPk(id);
    if (!doc) {
      return res.status(404).json({ error: 'Documento não encontrado.' });
    }
    return res.download(path.resolve(doc.caminho), doc.nome);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao baixar documento.' });
  }
};

export const deleteDocumento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const doc = await Documento.findByPk(id);
    if (!doc) {
      return res.status(404).json({ error: 'Documento não encontrado.' });
    }
    // Remove o arquivo físico
    if (fs.existsSync(doc.caminho)) {
      fs.unlinkSync(doc.caminho);
    }
    await doc.destroy();
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao remover documento.' });
  }
};