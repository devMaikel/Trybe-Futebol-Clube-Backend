import { IMatches, ITeam, ITeamTable } from '../interfaces';

const generateTable = (allTeams: ITeam[]): ITeamTable[] => {
  const table = allTeams.map((e: ITeam): ITeamTable => ({
    name: e.teamName,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  }));
  return table;
};

export const sortTable = (table: ITeamTable[]): ITeamTable[] => {
  const sortByGoalsO = table.sort((a, b) => b.goalsOwn - a.goalsOwn);
  const sortByGoalsF = sortByGoalsO.sort((a, b) => b.goalsFavor - a.goalsFavor);
  const sortByGoalsB = sortByGoalsF.sort((a, b) => b.goalsBalance - a.goalsBalance);
  const sortByVictories = sortByGoalsB.sort((a, b) => b.totalVictories - a.totalVictories);
  const sortByPoints = sortByVictories.sort((a, b) => b.totalPoints - a.totalPoints);
  return sortByPoints;
};

export const loadHomeMatchs = (allMatches: IMatches[], allTeams: ITeam[]): ITeamTable[] => {
  const table = generateTable(allTeams);
  allMatches.forEach((e) => {
    table[e.homeTeam - 1].goalsFavor += e.homeTeamGoals;
    table[e.homeTeam - 1].goalsOwn += e.awayTeamGoals;
    table[e.homeTeam - 1].totalGames += 1;
    if (e.homeTeamGoals > e.awayTeamGoals) table[e.homeTeam - 1].totalVictories += 1;
    else if (e.homeTeamGoals < e.awayTeamGoals) table[e.homeTeam - 1].totalLosses += 1;
    else table[e.homeTeam - 1].totalDraws += 1;
  });
  table.forEach((e) => {
    e.goalsBalance = e.goalsFavor - e.goalsOwn;
    e.totalPoints = e.totalVictories * 3 + e.totalDraws;
    e.efficiency = (e.totalPoints / (e.totalGames * 3)) * 100;
    e.efficiency = +e.efficiency.toFixed(2);
  });
  return sortTable(table);
};

// const testinho = loadHomeMatchs(allMatchesdb, allTeamsdb);
// console.log(testinho);
