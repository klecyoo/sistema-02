import { Request, Response } from 'express';
import { Convenio } from '../models/Convenio';

export const createConvenio = async (req: Request, res: Response) => {
  try {
    const { numero, objeto, concedente, convenente, vigenciaInicio, vigenciaFim, valorTotal, prefeituraId } = req.body;
    if (!numero || !objeto || !concedente || !convenente || !vigenciaInicio || !vigenciaFim || !valorTotal || !prefeituraId) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
    }
    const exists = await Convenio.findOne({ where: { numero } });
    if (exists) {
      return res.status(409).json({ error: 'Convênio já cadastrado.' });
    }
    const convenio = await Convenio.create({
      numero,
      objeto,
      concedente,
      convenente,
      vigenciaInicio,
      vigenciaFim,
      valorTotal,
      prefeituraId,
    });
    return res.status(201).json(convenio);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao cadastrar convênio.' });
  }
};

export const getConvenios = async (req: Request, res: Response) => {
  try {
    const convenios = await Convenio.findAll();
    return res.json(convenios);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar convênios.' });
  }
};

export const getConvenioById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const convenio = await Convenio.findByPk(id);
    if (!convenio) {
      return res.status(404).json({ error: 'Convênio não encontrado.' });
    }
    return res.json(convenio);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar convênio.' });
  }
};

export const updateConvenio = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const convenio = await Convenio.findByPk(id);
    if (!convenio) {
      return res.status(404).json({ error: 'Convênio não encontrado.' });
    }
    await convenio.update(req.body);
    return res.json(convenio);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao atualizar convênio.' });
  }
};

export const deleteConvenio = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const convenio = await Convenio.findByPk(id);
    if (!convenio) {
      return res.status(404).json({ error: 'Convênio não encontrado.' });
    }
    await convenio.destroy();
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao remover convênio.' });
  }
};