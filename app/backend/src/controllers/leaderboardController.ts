import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  leaderboardService = new LeaderboardService();
  async getHomeLeaderboard(_req: Request, res: Response) {
    const response = await this.leaderboardService.getHomeLeaderboard();
    return res.status(200).json(response);
  }

  async getAwayLeaderboard(_req: Request, res: Response) {
    const response = await this.leaderboardService.getAwayLeaderboard();
    return res.status(200).json(response);
  }
}
