import { Request, Response } from 'express';
import { IMatches, IMatchGoals } from '../interfaces';
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
      const notIpMatches = allMatches.filter((e) => e.inProgress === false);
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

  async addMatch(req: Request, res: Response) {
    const match = req.body as IMatches;
    if (match.homeTeam === match.awayTeam) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const response = await this.matchesService.addMatch(match);
    if (response === 'Id not exists') {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    return res.status(201).json(response);
  }

  async setInprogress(req: Request, res: Response) {
    const { id } = req.params;
    const matchSeted = await this.matchesService.setInprogress(+id, false);
    if (matchSeted === 1) {
      return res.status(200).json({ message: 'Finished' });
    }
    return res.status(404).json({ message: 'Match not founded/changed' });
  }

  async setInprogressGoals(req: Request, res: Response) {
    const { id } = req.params;
    const matchGoals = req.body as IMatchGoals;
    const matchSeted = await this.matchesService.setInprogressGoals(+id, matchGoals);
    if (+matchSeted === 1) {
      return res.status(200).json({ message: 'Goals updated!' });
    }
    return res.status(404).json({ message: 'Match not founded/changed' });
  }
}
