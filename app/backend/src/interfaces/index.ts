export interface IUser {
  id: number,
  username?: string,
  role?: string,
  email: string,
  password: string
}

export interface IEmailAndPassword {
  email: string,
  password: string
}

export interface ITokenDecoded {
  id: number,
  username: string,
  role: string,
  iat: number
}

export interface IStatusAndMessage {
  status: number,
  message: string
}

export interface ITeam {
  id?: number,
  teamName: string
}

export interface IMatches {
  id?: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress?: boolean,
  teamHome?: ITeam,
  teamAway?: ITeam
}

export interface IMatchGoals {
  homeTeamGoals: number,
  awayTeamGoals: number
}

export interface ITeamTable {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}
