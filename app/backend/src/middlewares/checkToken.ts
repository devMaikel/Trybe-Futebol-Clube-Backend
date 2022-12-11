import { NextFunction, Request, Response } from 'express';
import { tokenDecode } from '../utils/jwtUtils';

export default async function checkToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Token não encontrado!' });
  const user = tokenDecode(token);
  if (!user) return res.status(401).json({ message: 'Token inválido!' });
  next();
}
