import { Router } from 'express';
import TeamsController from '../controllers/teamsController';

const teamsRouter = Router();
const teamsController = new TeamsController();

teamsRouter.get('/', (req, res) => teamsController.getAll(req, res));
teamsRouter.get('/:id', (req, res) => teamsController.getOne(req, res));

export default teamsRouter;
