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

const playHomeMatches = (table: ITeamTable[], allMatches: IMatches[]): ITeamTable[] => {
  const newTable = table;
  allMatches.forEach((e) => {
    newTable[e.homeTeam - 1].goalsFavor += e.homeTeamGoals;
    newTable[e.homeTeam - 1].goalsOwn += e.awayTeamGoals;
    newTable[e.homeTeam - 1].totalGames += 1;
    if (e.homeTeamGoals > e.awayTeamGoals) newTable[e.homeTeam - 1].totalVictories += 1;
    else if (e.homeTeamGoals < e.awayTeamGoals) newTable[e.homeTeam - 1].totalLosses += 1;
    else newTable[e.homeTeam - 1].totalDraws += 1;
  });
  return newTable;
};

const playAwayMatches = (table: ITeamTable[], allMatches: IMatches[]): ITeamTable[] => {
  const newTable = table;
  allMatches.forEach((e) => {
    newTable[e.awayTeam - 1].goalsFavor += e.awayTeamGoals;
    newTable[e.awayTeam - 1].goalsOwn += e.homeTeamGoals;
    newTable[e.awayTeam - 1].totalGames += 1;
    if (e.awayTeamGoals > e.homeTeamGoals) newTable[e.awayTeam - 1].totalVictories += 1;
    else if (e.awayTeamGoals < e.homeTeamGoals) newTable[e.awayTeam - 1].totalLosses += 1;
    else newTable[e.awayTeam - 1].totalDraws += 1;
  });
  return newTable;
};

const updateTable = (table: ITeamTable[]) => {
  table.forEach((e) => {
    e.goalsBalance = e.goalsFavor - e.goalsOwn;
    e.totalPoints = e.totalVictories * 3 + e.totalDraws;
    e.efficiency = (e.totalPoints / (e.totalGames * 3)) * 100;
    e.efficiency = +e.efficiency.toFixed(2);
  });
};

export const loadHomeMatchs = (allMatches: IMatches[], allTeams: ITeam[]): ITeamTable[] => {
  const table = generateTable(allTeams);
  const matchedTable = playHomeMatches(table, allMatches);

  updateTable(matchedTable);
  return sortTable(matchedTable);
};

export const loadAwayMatches = (allMatches: IMatches[], allTeams: ITeam[]): ITeamTable[] => {
  const table = generateTable(allTeams);
  const matchedTable = playAwayMatches(table, allMatches);

  updateTable(matchedTable);
  return sortTable(matchedTable);
};

export const loadAllMatches = (allMatches: IMatches[], allTeams: ITeam[]): ITeamTable[] => {
  const table = generateTable(allTeams);
  const homeTable = playHomeMatches(table, allMatches);
  const finalTable = playAwayMatches(homeTable, allMatches);
  updateTable(finalTable);
  return sortTable(finalTable);
};
