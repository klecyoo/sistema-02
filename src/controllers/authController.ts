import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, prefeituraId } = req.body;

    if (!name || !email || !password || !role || !prefeituraId) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'E-mail já cadastrado.' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role, prefeituraId });

    return res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role, prefeituraId: user.prefeituraId });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        prefeituraId: user.prefeituraId,
      },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        prefeituraId: user.prefeituraId,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao autenticar usuário.' });
  }
};