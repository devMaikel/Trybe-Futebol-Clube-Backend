import { loadAwayMatches, loadHomeMatchs } from '../utils/leaderBoardGen';
import { IMatches, ITeam } from '../interfaces';
import MatchesModel from '../database/models/MatchesModel';
import MatchesService from './matchesService';
import TeamsService from './teamsService';

export default class LeaderboardService {
  matchesService = new MatchesService();
  teamsService = new TeamsService();
  matchesModel = MatchesModel;

  async getHomeLeaderboard() {
    const result = await this.matchesModel.findAll();
    const allMatches = result.map((e) => e.dataValues) as IMatches[];
    const allFinishedMatches = allMatches.filter((e) => e.inProgress === false);
    const allTeams = await this.teamsService.getAll() as ITeam[];
    const tableHomeMatches = loadHomeMatchs(allFinishedMatches, allTeams);
    return tableHomeMatches;
  }

  async getAwayLeaderboard() {
    const result = await this.matchesModel.findAll();
    const allMatches = result.map((e) => e.dataValues) as IMatches[];
    const allFinishedMatches = allMatches.filter((e) => e.inProgress === false);
    const allTeams = await this.teamsService.getAll() as ITeam[];
    const tableAwayMatches = loadAwayMatches(allFinishedMatches, allTeams);
    return tableAwayMatches;
  }
}
