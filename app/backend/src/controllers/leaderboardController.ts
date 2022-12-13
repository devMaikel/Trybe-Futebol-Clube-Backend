import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  leaderboardService = new LeaderboardService();
  async getHomeLeaderboard(req: Request, res: Response) {
    const response = await this.leaderboardService.getHomeLeaderboard();
    return res.status(200).json(response);
  }
}
