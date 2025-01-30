'use client';

import * as React from 'react';
import styles from '@components/page/LeaguePage.module.scss';

import ActionBar from '@components/ActionBar';
import DataTable from '@components/DataTable';
import BlockLoader from '@components/BlockLoader';
import DatePicker from '@components/DatePicker';
import Card from '@components/Card';
import Button from '@components/Button';

import { BUNDESLIGA_STANDINGS, LA_LIGA_STANDINGS, SERIE_A_STANDINGS, PREMIER_LEAGUE_STANDINGS, type LeagueStandings } from '@constants/standings';

interface LeaguePageProps {
  leagueId: string;
  onBack: () => void;
}

const getLeagueData = (leagueId: string): LeagueStandings | null => {
  switch (leagueId) {
    case 'premier-league':
      return PREMIER_LEAGUE_STANDINGS;
    case 'bundesliga':
      return BUNDESLIGA_STANDINGS;
    case 'serie-a':
      return SERIE_A_STANDINGS;
    case 'la-liga':
      return LA_LIGA_STANDINGS;
    default:
      return null;
  }
};

const formatStandingsData = (standings: LeagueStandings): string[][] => {
  const headers = ['Pos', 'Team', 'P', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts'];
  const rows = standings.standings.map(team => [
    team.position.toString(),
    team.team,
    team.played.toString(),
    team.won.toString(),
    team.drawn.toString(),
    team.lost.toString(),
    team.goalsFor.toString(),
    team.goalsAgainst.toString(),
    (team.goalDifference >= 0 ? '+' : '') + team.goalDifference.toString(),
    team.points.toString()
  ]);
  return [headers, ...rows];
};

const LeaguePage: React.FC<LeaguePageProps> = ({ leagueId, onBack }) => {
  const [activeTab, setActiveTab] = React.useState('table');
  const [isLoading, setIsLoading] = React.useState(true);
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const leagueData = getLeagueData(leagueId);
  const tableData = leagueData ? formatStandingsData(leagueData) : [];

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const actionItems = [
    {
      body: 'Table',
      selected: activeTab === 'table',
      onClick: () => setActiveTab('table'),
    },
    {
      body: 'Matches',
      selected: activeTab === 'matches',
      onClick: () => setActiveTab('matches'),
    },
    {
      body: 'News',
      selected: activeTab === 'news',
      onClick: () => setActiveTab('news'),
    },
    {
      body: 'Historical Data',
      onClick: () => setShowDatePicker(true),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ActionBar items={actionItems} />
      </div>

      <div className={styles.content}>
        {isLoading ? (
          <div className={styles.loader}>
            <BlockLoader mode={1} />
            <span>Loading league data...</span>
          </div>
        ) : (
          <>
            {activeTab === 'table' && (
              <Card title={`${leagueData?.name || 'League'} Table`} mode="left">
                <DataTable data={tableData} />
              </Card>
            )}
            {activeTab === 'matches' && (
              <Card title="Upcoming Matches" mode="left">
                <div className={styles.centered}>Coming soon...</div>
              </Card>
            )}
            {activeTab === 'news' && (
              <Card title="Latest News" mode="left">
                <div className={styles.centered}>Coming soon...</div>
              </Card>
            )}
          </>
        )}
      </div>

      {showDatePicker && (
        <div className={styles.datePicker}>
          <Card title="Select Date" mode="left">
            <DatePicker />
            <div className={styles.dateActions}>
              <Button onClick={() => setShowDatePicker(false)}>Close</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LeaguePage; 