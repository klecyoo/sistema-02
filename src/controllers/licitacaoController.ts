import { Request, Response } from 'express';
import { Licitacao } from '../models/Licitacao';

export const createLicitacao = async (req: Request, res: Response) => {
  try {
    const { modalidade, edital, processo, dataAbertura, convenioId } = req.body;
    if (!modalidade || !edital || !processo || !dataAbertura || !convenioId) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
    }
    const licitacao = await Licitacao.create({
      modalidade,
      edital,
      processo,
      dataAbertura,
      convenioId,
    });
    return res.status(201).json(licitacao);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao cadastrar licitação.' });
  }
};

export const getLicitacoes = async (req: Request, res: Response) => {
  try {
    const licitacoes = await Licitacao.findAll();
    return res.json(licitacoes);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar licitações.' });
  }
};

export const getLicitacaoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const licitacao = await Licitacao.findByPk(id);
    if (!licitacao) {
      return res.status(404).json({ error: 'Licitação não encontrada.' });
    }
    return res.json(licitacao);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar licitação.' });
  }
};

export const updateLicitacao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const licitacao = await Licitacao.findByPk(id);
    if (!licitacao) {
      return res.status(404).json({ error: 'Licitação não encontrada.' });
    }
    await licitacao.update(req.body);
    return res.json(licitacao);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao atualizar licitação.' });
  }
};

export const deleteLicitacao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const licitacao = await Licitacao.findByPk(id);
    if (!licitacao) {
      return res.status(404).json({ error: 'Licitação não encontrada.' });
    }
    await licitacao.destroy();
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao remover licitação.' });
  }
};