import TeamsModel from '../database/models/TeamsModel';

class TeamsService {
  public teamsModel = TeamsModel;

  public getAll = async (): Promise<Array<object>> => {
    const findedTeams = await this.teamsModel.findAll({ raw: true });
    return findedTeams;
  };

  public getOne = async (id:string): Promise<object | null> => {
    const findedTeam = await this.teamsModel.findOne({ where: { id }, raw: true });
    return findedTeam;
  };
}

export default TeamsService;
