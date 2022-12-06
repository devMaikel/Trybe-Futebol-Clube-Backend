import { Request, Response } from 'express';
import { IEmailAndPassword } from '../interfaces';
import LoginService from '../services/loginService';

export default class LoginController {
  loginService = new LoginService();

  async login(req: Request, res: Response) {
    const userToLogin = req.body as IEmailAndPassword;
    const serviceReturn = await this.loginService.login(userToLogin);
    return res.status(serviceReturn.status).json({ message: serviceReturn.message });
  }
}
