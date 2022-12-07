import { NextFunction, Request, Response } from 'express';

const RegexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function validateEmailAndPassword(req: Request, res: Response, next: NextFunction) {
  const user = req.body;
  if (!user.password) return res.status(400).json({ message: 'All fields must be filled' });
  const isEmail = RegexEmail.test(user.email);
  console.log(isEmail);
  if (!isEmail) return res.status(401).json({ message: 'Incorrect email or passwordregex' });
  next();
}
