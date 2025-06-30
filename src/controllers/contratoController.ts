import { Request, Response } from 'express';
import { Contrato } from '../models/Contrato';

export const createContrato = async (req: Request, res: Response) => {
  try {
    const { numero, contratado, valor, vigenciaInicio, vigenciaFim, licitacaoId } = req.body;
    if (!numero || !contratado || !valor || !vigenciaInicio || !vigenciaFim || !licitacaoId) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
    }
    const exists = await Contrato.findOne({ where: { numero } });
    if (exists) {
      return res.status(409).json({ error: 'Contrato já cadastrado.' });
    }
    const contrato = await Contrato.create({
      numero,
      contratado,
      valor,
      vigenciaInicio,
      vigenciaFim,
      licitacaoId,
    });
    return res.status(201).json(contrato);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao cadastrar contrato.' });
  }
};

export const getContratos = async (req: Request, res: Response) => {
  try {
    const contratos = await Contrato.findAll();
    return res.json(contratos);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar contratos.' });
  }
};

export const getContratoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contrato = await Contrato.findByPk(id);
    if (!contrato) {
      return res.status(404).json({ error: 'Contrato não encontrado.' });
    }
    return res.json(contrato);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar contrato.' });
  }
};

export const updateContrato = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contrato = await Contrato.findByPk(id);
    if (!contrato) {
      return res.status(404).json({ error: 'Contrato não encontrado.' });
    }
    await contrato.update(req.body);
    return res.json(contrato);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao atualizar contrato.' });
  }
};

export const deleteContrato = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contrato = await Contrato.findByPk(id);
    if (!contrato) {
      return res.status(404).json({ error: 'Contrato não encontrado.' });
    }
    await contrato.destroy();
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao remover contrato.' });
  }
};