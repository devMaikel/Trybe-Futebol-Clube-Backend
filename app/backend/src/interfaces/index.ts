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
