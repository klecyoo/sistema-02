import { Request, Response } from 'express';
import { Obra } from '../models/Obra';

export const createObra = async (req: Request, res: Response) => {
  try {
    const { nome, status, percentualExecucao, dataInicio, dataFim, contratoId } = req.body;
    if (!nome || !status || percentualExecucao === undefined || !dataInicio || !contratoId) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
    }
    const obra = await Obra.create({
      nome,
      status,
      percentualExecucao,
      dataInicio,
      dataFim,
      contratoId,
    });
    return res.status(201).json(obra);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao cadastrar obra.' });
  }
};

export const getObras = async (_req: Request, res: Response) => {
  try {
    const obras = await Obra.findAll();
    return res.json(obras);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar obras.' });
  }
};

export const getObraById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const obra = await Obra.findByPk(id);
    if (!obra) {
      return res.status(404).json({ error: 'Obra não encontrada.' });
    }
    return res.json(obra);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar obra.' });
  }
};

export const updateObra = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const obra = await Obra.findByPk(id);
    if (!obra) {
      return res.status(404).json({ error: 'Obra não encontrada.' });
    }
    await obra.update(req.body);
    return res.json(obra);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao atualizar obra.' });
  }
};

export const deleteObra = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const obra = await Obra.findByPk(id);
    if (!obra) {
      return res.status(404).json({ error: 'Obra não encontrada.' });
    }
    await obra.destroy();
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao remover obra.' });
  }
};