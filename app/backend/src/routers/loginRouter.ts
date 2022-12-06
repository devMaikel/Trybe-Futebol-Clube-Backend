import { Router } from 'express';
import LoginController from '../controllers/loginController';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post(
  '/',
  (req, res) => loginController.login(req, res),
);

export default loginRouter;
