import { IMatches, IMatchGoals } from '../interfaces';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import TeamsService from './teamsService';

class MatchesService {
  public matchesModel = MatchesModel;

  public getAll = async () => {
    const findedMatches = await this.matchesModel.findAll({
      include: [
        {
          model: TeamsModel,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: TeamsModel,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return findedMatches;
  };

  // public getOne = async (id:string): Promise<object | null> => {
  //   const findedTeam = await this.teamsModel.findOne({ where: { id }, raw: true });
  //   return findedTeam;
  // };

  public addMatch = async (match: IMatches) => {
    const teamService = new TeamsService();

    if (!await teamService.getOne(match.homeTeam.toString())
      || !await teamService.getOne(match.awayTeam.toString())) {
      return 'Id not exists';
    }
    const addedMatch = await this.matchesModel.create({ ...match, inProgress: true });
    return addedMatch;
  };

  public setInprogress = async (id: number, inProgress: boolean) => {
    const numberOfSetedMatches = await this.matchesModel.update({ inProgress }, { where: { id } });
    return +numberOfSetedMatches;
  };

  public setInprogressGoals = async (id: number, matchGoals: IMatchGoals) => {
    const matchSeted = await this.matchesModel.update({
      homeTeamGoals: matchGoals.homeTeamGoals,
      awayTeamGoals: matchGoals.awayTeamGoals,
    }, { where: { id } });
    return matchSeted;
  };
}

export default MatchesService;
