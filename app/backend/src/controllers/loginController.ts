import { Request, Response } from 'express';
import { tokenDecode } from '../utils/jwtUtils';
import { IEmailAndPassword } from '../interfaces';
import LoginService from '../services/loginService';

export default class LoginController {
  loginService = new LoginService();

  async login(req: Request, res: Response) {
    const userToLogin = req.body as IEmailAndPassword;
    const serviceReturn = await this.loginService.login(userToLogin);
    if (serviceReturn.status === 200) {
      return res.status(serviceReturn.status).json({ token: serviceReturn.message });
    }
    return res.status(serviceReturn.status).json({ message: serviceReturn.message });
  }

  public checkToken = async (req: Request, res: Response) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Token não encontrado!' });
    const user = tokenDecode(token);
    if (!user) return res.status(401).json({ message: 'Token must be a valid token' });
    return res.status(200).json({ role: user?.role });
  };
}
