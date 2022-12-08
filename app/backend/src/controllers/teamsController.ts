import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  teamsService = new TeamsService();

  async getAll(_req: Request, res: Response) {
    const serviceReturn = await this.teamsService.getAll();
    if (!serviceReturn) {
      return res.status(401).json({ message: 'Teams not founded!' });
    }
    return res.status(200).json(serviceReturn);
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const serviceReturn = await this.teamsService.getOne(id);
    if (!serviceReturn) {
      return res.status(401).json({ message: 'Team not founded!' });
    }
    return res.status(200).json(serviceReturn);
  }
}
