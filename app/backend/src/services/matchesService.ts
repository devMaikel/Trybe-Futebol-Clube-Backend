import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';

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
}

export default MatchesService;
