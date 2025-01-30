export interface Match {
  date: string;
  homeTeam: string;
  awayTeam: string;
  score?: {
    home: number;
    away: number;
  };
}

export interface Matchweek {
  week: number;
  matches: Match[];
}

// Example data for Premier League matchweek 33
export const PREMIER_LEAGUE_MATCHWEEK_33: Matchweek = {
  week: 33,
  matches: [
    {
      date: '2024-03-30',
      homeTeam: 'Arsenal',
      awayTeam: 'Brighton',
      score: { home: 3, away: 0 }
    },
    {
      date: '2024-03-30',
      homeTeam: 'Brentford',
      awayTeam: 'Manchester United',
      score: { home: 1, away: 2 }
    },
    {
      date: '2024-03-30',
      homeTeam: 'Nottingham Forest',
      awayTeam: 'Crystal Palace',
      score: { home: 1, away: 1 }
    },
    {
      date: '2024-03-30',
      homeTeam: 'Chelsea',
      awayTeam: 'Burnley',
      score: { home: 2, away: 0 }
    },
    {
      date: '2024-03-30',
      homeTeam: 'Sheffield United',
      awayTeam: 'Fulham',
      score: { home: 0, away: 3 }
    },
    {
      date: '2024-03-30',
      homeTeam: 'Aston Villa',
      awayTeam: 'Wolves',
      score: { home: 2, away: 0 }
    },
    {
      date: '2024-03-31',
      homeTeam: 'Liverpool',
      awayTeam: 'Manchester City',
      score: { home: 2, away: 1 }
    },
    {
      date: '2024-03-31',
      homeTeam: 'Tottenham',
      awayTeam: 'Luton',
      score: { home: 4, away: 0 }
    },
    {
      date: '2024-03-31',
      homeTeam: 'West Ham',
      awayTeam: 'Everton',
      score: { home: 2, away: 2 }
    },
    {
      date: '2024-04-01',
      homeTeam: 'Newcastle',
      awayTeam: 'Bournemouth',
      score: { home: 3, away: 1 }
    }
  ]
}; 