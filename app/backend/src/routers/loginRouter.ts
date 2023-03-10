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

loginRouter.get('/validate', (req, res) => loginController.checkToken(req, res));

export default loginRouter;
