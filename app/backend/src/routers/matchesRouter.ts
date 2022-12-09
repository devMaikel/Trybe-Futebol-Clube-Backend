import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get('/', (req, res) => matchesController.getAll(req, res));
// teamsRouter.get('/:id', (req, res) => matchesController.getOne(req, res));

export default matchesRouter;
