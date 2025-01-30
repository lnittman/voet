export interface TeamStanding {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface LeagueStandings {
  id: string;
  name: string;
  country: string;
  standings: TeamStanding[];
}

export const PREMIER_LEAGUE_STANDINGS: LeagueStandings = {
  id: 'premier-league',
  name: 'Premier League',
  country: 'England',
  standings: [
    { position: 1, team: 'Arsenal', played: 32, won: 23, drawn: 5, lost: 4, goalsFor: 77, goalsAgainst: 26, goalDifference: 51, points: 74 },
    { position: 2, team: 'Manchester City', played: 31, won: 22, drawn: 4, lost: 5, goalsFor: 78, goalsAgainst: 29, goalDifference: 49, points: 70 },
    { position: 3, team: 'Liverpool', played: 32, won: 21, drawn: 7, lost: 4, goalsFor: 72, goalsAgainst: 31, goalDifference: 41, points: 70 },
    { position: 4, team: 'Aston Villa', played: 33, won: 19, drawn: 5, lost: 9, goalsFor: 66, goalsAgainst: 46, goalDifference: 20, points: 62 },
    { position: 5, team: 'Tottenham', played: 32, won: 18, drawn: 5, lost: 9, goalsFor: 65, goalsAgainst: 49, goalDifference: 16, points: 59 },
    { position: 6, team: 'Manchester United', played: 32, won: 16, drawn: 5, lost: 11, goalsFor: 48, goalsAgainst: 43, goalDifference: 5, points: 53 },
    { position: 7, team: 'Newcastle', played: 32, won: 15, drawn: 7, lost: 10, goalsFor: 69, goalsAgainst: 48, goalDifference: 21, points: 52 },
    { position: 8, team: 'West Ham', played: 33, won: 13, drawn: 8, lost: 12, goalsFor: 51, goalsAgainst: 58, goalDifference: -7, points: 47 },
    { position: 9, team: 'Chelsea', played: 32, won: 12, drawn: 9, lost: 11, goalsFor: 53, goalsAgainst: 52, goalDifference: 1, points: 45 },
    { position: 10, team: 'Brighton', played: 31, won: 12, drawn: 9, lost: 10, goalsFor: 52, goalsAgainst: 47, goalDifference: 5, points: 45 },
    { position: 11, team: 'Wolves', played: 33, won: 12, drawn: 6, lost: 15, goalsFor: 46, goalsAgainst: 54, goalDifference: -8, points: 42 },
    { position: 12, team: 'Fulham', played: 33, won: 11, drawn: 5, lost: 17, goalsFor: 45, goalsAgainst: 55, goalDifference: -10, points: 38 },
    { position: 13, team: 'Crystal Palace', played: 33, won: 9, drawn: 9, lost: 15, goalsFor: 37, goalsAgainst: 54, goalDifference: -17, points: 36 },
    { position: 14, team: 'Bournemouth', played: 32, won: 8, drawn: 8, lost: 16, goalsFor: 41, goalsAgainst: 64, goalDifference: -23, points: 32 },
    { position: 15, team: 'Brentford', played: 33, won: 8, drawn: 8, lost: 17, goalsFor: 45, goalsAgainst: 59, goalDifference: -14, points: 32 },
    { position: 16, team: 'Everton', played: 32, won: 8, drawn: 7, lost: 17, goalsFor: 32, goalsAgainst: 48, goalDifference: -16, points: 27 },
    { position: 17, team: 'Nottingham Forest', played: 33, won: 7, drawn: 9, lost: 17, goalsFor: 38, goalsAgainst: 58, goalDifference: -20, points: 26 },
    { position: 18, team: 'Luton', played: 32, won: 6, drawn: 7, lost: 19, goalsFor: 41, goalsAgainst: 68, goalDifference: -27, points: 25 },
    { position: 19, team: 'Burnley', played: 33, won: 4, drawn: 7, lost: 22, goalsFor: 31, goalsAgainst: 71, goalDifference: -40, points: 19 },
    { position: 20, team: 'Sheffield United', played: 32, won: 3, drawn: 6, lost: 23, goalsFor: 27, goalsAgainst: 82, goalDifference: -55, points: 15 }
  ]
};

export const BUNDESLIGA_STANDINGS: LeagueStandings = {
  id: 'bundesliga',
  name: 'Bundesliga',
  country: 'Germany',
  standings: [
    { position: 1, team: 'Bayer Leverkusen', played: 32, won: 26, drawn: 5, lost: 1, goalsFor: 75, goalsAgainst: 19, goalDifference: 56, points: 83 },
    { position: 2, team: 'Bayern Munich', played: 32, won: 20, drawn: 4, lost: 8, goalsFor: 84, goalsAgainst: 37, goalDifference: 47, points: 64 },
    { position: 3, team: 'VfB Stuttgart', played: 32, won: 19, drawn: 4, lost: 9, goalsFor: 65, goalsAgainst: 40, goalDifference: 25, points: 61 },
    { position: 4, team: 'RB Leipzig', played: 32, won: 17, drawn: 6, lost: 9, goalsFor: 64, goalsAgainst: 40, goalDifference: 24, points: 57 },
    { position: 5, team: 'Borussia Dortmund', played: 32, won: 16, drawn: 8, lost: 8, goalsFor: 55, goalsAgainst: 39, goalDifference: 16, points: 56 },
    { position: 6, team: 'Eintracht Frankfurt', played: 32, won: 12, drawn: 12, lost: 8, goalsFor: 46, goalsAgainst: 41, goalDifference: 5, points: 48 },
    { position: 7, team: 'Augsburg', played: 32, won: 11, drawn: 9, lost: 12, goalsFor: 47, goalsAgainst: 49, goalDifference: -2, points: 42 },
    { position: 8, team: 'Hoffenheim', played: 32, won: 11, drawn: 7, lost: 14, goalsFor: 50, goalsAgainst: 57, goalDifference: -7, points: 40 },
    { position: 9, team: 'SC Freiburg', played: 32, won: 10, drawn: 9, lost: 13, goalsFor: 41, goalsAgainst: 53, goalDifference: -12, points: 39 },
    { position: 10, team: 'Werder Bremen', played: 32, won: 10, drawn: 7, lost: 15, goalsFor: 39, goalsAgainst: 49, goalDifference: -10, points: 37 },
    { position: 11, team: 'Borussia M.Gladbach', played: 32, won: 8, drawn: 11, lost: 13, goalsFor: 51, goalsAgainst: 56, goalDifference: -5, points: 35 },
    { position: 12, team: 'Union Berlin', played: 32, won: 9, drawn: 8, lost: 15, goalsFor: 32, goalsAgainst: 49, goalDifference: -17, points: 35 },
    { position: 13, team: 'VfL Wolfsburg', played: 32, won: 8, drawn: 10, lost: 14, goalsFor: 35, goalsAgainst: 48, goalDifference: -13, points: 34 },
    { position: 14, team: 'VfL Bochum', played: 32, won: 7, drawn: 11, lost: 14, goalsFor: 34, goalsAgainst: 61, goalDifference: -27, points: 32 },
    { position: 15, team: 'FSV Mainz 05', played: 32, won: 6, drawn: 11, lost: 15, goalsFor: 32, goalsAgainst: 50, goalDifference: -18, points: 29 },
    { position: 16, team: 'FC Köln', played: 32, won: 5, drawn: 9, lost: 18, goalsFor: 27, goalsAgainst: 57, goalDifference: -30, points: 24 },
    { position: 17, team: 'FC Heidenheim', played: 32, won: 5, drawn: 7, lost: 20, goalsFor: 35, goalsAgainst: 62, goalDifference: -27, points: 22 },
    { position: 18, team: 'SV Darmstadt 98', played: 32, won: 4, drawn: 7, lost: 21, goalsFor: 31, goalsAgainst: 71, goalDifference: -40, points: 19 }
  ]
};

export const SERIE_A_STANDINGS: LeagueStandings = {
  id: 'serie-a',
  name: 'Serie A',
  country: 'Italy',
  standings: [
    { position: 1, team: 'Inter Milan', played: 32, won: 27, drawn: 3, lost: 2, goalsFor: 77, goalsAgainst: 17, goalDifference: 60, points: 84 },
    { position: 2, team: 'AC Milan', played: 32, won: 21, drawn: 5, lost: 6, goalsFor: 64, goalsAgainst: 37, goalDifference: 27, points: 68 },
    { position: 3, team: 'Juventus', played: 32, won: 18, drawn: 8, lost: 6, goalsFor: 48, goalsAgainst: 26, goalDifference: 22, points: 62 },
    { position: 4, team: 'Bologna', played: 32, won: 17, drawn: 9, lost: 6, goalsFor: 48, goalsAgainst: 29, goalDifference: 19, points: 60 },
    { position: 5, team: 'Roma', played: 32, won: 16, drawn: 8, lost: 8, goalsFor: 57, goalsAgainst: 35, goalDifference: 22, points: 56 },
    { position: 6, team: 'Atalanta', played: 31, won: 16, drawn: 5, lost: 10, goalsFor: 56, goalsAgainst: 34, goalDifference: 22, points: 53 },
    { position: 7, team: 'Lazio', played: 32, won: 15, drawn: 7, lost: 10, goalsFor: 42, goalsAgainst: 33, goalDifference: 9, points: 52 },
    { position: 8, team: 'Napoli', played: 32, won: 13, drawn: 9, lost: 10, goalsFor: 47, goalsAgainst: 39, goalDifference: 8, points: 48 },
    { position: 9, team: 'Torino', played: 32, won: 12, drawn: 11, lost: 9, goalsFor: 32, goalsAgainst: 29, goalDifference: 3, points: 47 },
    { position: 10, team: 'Fiorentina', played: 31, won: 12, drawn: 10, lost: 9, goalsFor: 44, goalsAgainst: 34, goalDifference: 10, points: 46 },
    { position: 11, team: 'Monza', played: 32, won: 11, drawn: 10, lost: 11, goalsFor: 34, goalsAgainst: 41, goalDifference: -7, points: 43 },
    { position: 12, team: 'Genoa', played: 32, won: 9, drawn: 11, lost: 12, goalsFor: 33, goalsAgainst: 39, goalDifference: -6, points: 38 },
    { position: 13, team: 'Lecce', played: 32, won: 7, drawn: 11, lost: 14, goalsFor: 28, goalsAgainst: 47, goalDifference: -19, points: 32 },
    { position: 14, team: 'Udinese', played: 32, won: 5, drawn: 16, lost: 11, goalsFor: 31, goalsAgainst: 47, goalDifference: -16, points: 31 },
    { position: 15, team: 'Verona', played: 32, won: 7, drawn: 9, lost: 16, goalsFor: 29, goalsAgainst: 44, goalDifference: -15, points: 30 },
    { position: 16, team: 'Cagliari', played: 32, won: 7, drawn: 9, lost: 16, goalsFor: 32, goalsAgainst: 54, goalDifference: -22, points: 30 },
    { position: 17, team: 'Empoli', played: 32, won: 7, drawn: 8, lost: 17, goalsFor: 25, goalsAgainst: 48, goalDifference: -23, points: 29 },
    { position: 18, team: 'Frosinone', played: 32, won: 6, drawn: 10, lost: 16, goalsFor: 39, goalsAgainst: 61, goalDifference: -22, points: 28 },
    { position: 19, team: 'Sassuolo', played: 32, won: 6, drawn: 8, lost: 18, goalsFor: 35, goalsAgainst: 61, goalDifference: -26, points: 26 },
    { position: 20, team: 'Salernitana', played: 32, won: 2, drawn: 8, lost: 22, goalsFor: 25, goalsAgainst: 71, goalDifference: -46, points: 14 }
  ]
};

export const LA_LIGA_STANDINGS: LeagueStandings = {
  id: 'la-liga',
  name: 'La Liga',
  country: 'Spain',
  standings: [
    { position: 1, team: 'Real Madrid', played: 32, won: 24, drawn: 6, lost: 2, goalsFor: 70, goalsAgainst: 22, goalDifference: 48, points: 78 },
    { position: 2, team: 'Barcelona', played: 32, won: 21, drawn: 8, lost: 3, goalsFor: 63, goalsAgainst: 34, goalDifference: 29, points: 71 },
    { position: 3, team: 'Girona', played: 32, won: 21, drawn: 6, lost: 5, goalsFor: 64, goalsAgainst: 37, goalDifference: 27, points: 69 },
    { position: 4, team: 'Atlético Madrid', played: 32, won: 19, drawn: 5, lost: 8, goalsFor: 60, goalsAgainst: 35, goalDifference: 25, points: 62 },
    { position: 5, team: 'Athletic Club', played: 32, won: 16, drawn: 10, lost: 6, goalsFor: 51, goalsAgainst: 31, goalDifference: 20, points: 58 },
    { position: 6, team: 'Real Sociedad', played: 32, won: 13, drawn: 11, lost: 8, goalsFor: 44, goalsAgainst: 34, goalDifference: 10, points: 50 },
    { position: 7, team: 'Real Betis', played: 32, won: 11, drawn: 13, lost: 8, goalsFor: 38, goalsAgainst: 37, goalDifference: 1, points: 46 },
    { position: 8, team: 'Valencia', played: 32, won: 12, drawn: 9, lost: 11, goalsFor: 36, goalsAgainst: 37, goalDifference: -1, points: 45 },
    { position: 9, team: 'Las Palmas', played: 32, won: 12, drawn: 7, lost: 13, goalsFor: 35, goalsAgainst: 38, goalDifference: -3, points: 43 },
    { position: 10, team: 'Osasuna', played: 32, won: 11, drawn: 9, lost: 12, goalsFor: 36, goalsAgainst: 43, goalDifference: -7, points: 42 },
    { position: 11, team: 'Villarreal', played: 32, won: 10, drawn: 9, lost: 13, goalsFor: 49, goalsAgainst: 54, goalDifference: -5, points: 39 },
    { position: 12, team: 'Alavés', played: 32, won: 9, drawn: 10, lost: 13, goalsFor: 31, goalsAgainst: 39, goalDifference: -8, points: 37 },
    { position: 13, team: 'Mallorca', played: 32, won: 8, drawn: 12, lost: 12, goalsFor: 30, goalsAgainst: 39, goalDifference: -9, points: 36 },
    { position: 14, team: 'Sevilla', played: 32, won: 8, drawn: 11, lost: 13, goalsFor: 37, goalsAgainst: 44, goalDifference: -7, points: 35 },
    { position: 15, team: 'Rayo Vallecano', played: 32, won: 7, drawn: 13, lost: 12, goalsFor: 29, goalsAgainst: 43, goalDifference: -14, points: 34 },
    { position: 16, team: 'Getafe', played: 32, won: 7, drawn: 12, lost: 13, goalsFor: 35, goalsAgainst: 48, goalDifference: -13, points: 33 },
    { position: 17, team: 'Celta Vigo', played: 32, won: 7, drawn: 10, lost: 15, goalsFor: 34, goalsAgainst: 46, goalDifference: -12, points: 31 },
    { position: 18, team: 'Cádiz', played: 32, won: 4, drawn: 14, lost: 14, goalsFor: 23, goalsAgainst: 45, goalDifference: -22, points: 26 },
    { position: 19, team: 'Granada', played: 32, won: 3, drawn: 9, lost: 20, goalsFor: 31, goalsAgainst: 61, goalDifference: -30, points: 18 },
    { position: 20, team: 'Almería', played: 32, won: 1, drawn: 8, lost: 23, goalsFor: 27, goalsAgainst: 69, goalDifference: -42, points: 11 }
  ]
}; 