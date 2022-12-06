import { Router } from 'express';
import validateEmailAndPassword from '../middlewares/loginMiddleware';
import LoginController from '../controllers/loginController';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post(
  '/',
  validateEmailAndPassword,
  (req, res) => loginController.login(req, res),
);

export default loginRouter;
