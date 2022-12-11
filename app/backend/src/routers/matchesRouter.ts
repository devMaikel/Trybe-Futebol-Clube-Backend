import { Router } from 'express';
import checkToken from '../middlewares/checkToken';
import MatchesController from '../controllers/matchesController';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get('/', (req, res) => matchesController.getAll(req, res));
matchesRouter.post('/', checkToken, (req, res) => matchesController.addMatch(req, res));
matchesRouter.patch('/:id/finish', (req, res) => matchesController.setInprogress(req, res));
matchesRouter.patch('/:id', (req, res) => matchesController.setInprogressGoals(req, res));

export default matchesRouter;
