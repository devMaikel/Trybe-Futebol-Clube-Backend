import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  matchesService = new MatchesService();

  async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const allMatches = await this.matchesService.getAll();
    if (!allMatches) {
      return res.status(401).json({ message: 'Matches not founded!' });
    }
    if (inProgress === 'true') {
      const ipMatches = allMatches.filter((e) => e.inProgress === true);
      return res.status(200).json(ipMatches);
    }
    if (inProgress === 'false') {
      const notIpMatches = allMatches.filter((e) => e.inProgress === true);
      return res.status(200).json(notIpMatches);
    }
    return res.status(200).json(allMatches);
  }

  // async getOne(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const serviceReturn = await this.teamsService.getOne(id);
  //   if (!serviceReturn) {
  //     return res.status(401).json({ message: 'Team not founded!' });
  //   }
  //   return res.status(200).json(serviceReturn);
  // }
}
