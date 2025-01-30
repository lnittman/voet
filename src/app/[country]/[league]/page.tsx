'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import ButtonGroup from '@components/ButtonGroup';
import DataTable from '@components/DataTable';
import styles from './page.module.scss';
import Table from '@components/Table';
import TableColumn from '@components/TableColumn';
import Card from '@components/Card';
import ActionListItem from '@components/ActionListItem';
import Row from '@components/Row';

// Example data - in a real app this would come from an API
const EXAMPLE_LEAGUE_TABLE = [
  ['Pos', 'Club', 'MP', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts'],
  ['1', 'Arsenal', '32', '23', '5', '4', '77', '26', '+51', '74'],
  ['2', 'Manchester City', '31', '22', '4', '5', '78', '29', '+49', '70'],
  ['3', 'Liverpool', '32', '21', '7', '4', '72', '31', '+41', '70'],
  ['4', 'Aston Villa', '33', '19', '5', '9', '66', '46', '+20', '62'],
  ['5', 'Tottenham', '32', '18', '5', '9', '65', '49', '+16', '59'],
  ['6', 'Manchester Utd', '32', '16', '5', '11', '48', '43', '+5', '53'],
  ['7', 'Newcastle', '32', '15', '7', '10', '69', '48', '+21', '52'],
  ['8', 'West Ham', '33', '13', '8', '12', '51', '58', '-7', '47'],
  ['9', 'Chelsea', '32', '12', '9', '11', '53', '52', '+1', '45'],
  ['10', 'Brighton', '31', '12', '9', '10', '52', '47', '+5', '45'],
  ['11', 'Wolves', '33', '12', '6', '15', '46', '54', '-8', '42'],
  ['12', 'Fulham', '33', '11', '5', '17', '45', '55', '-10', '38'],
  ['13', 'Crystal Palace', '33', '9', '9', '15', '37', '54', '-17', '36'],
  ['14', 'Bournemouth', '32', '8', '8', '16', '41', '64', '-23', '32'],
  ['15', 'Brentford', '33', '8', '8', '17', '45', '59', '-14', '32'],
  ['16', 'Everton', '32', '8', '7', '17', '32', '48', '-16', '27'],
  ['17', 'Nottm Forest', '33', '7', '9', '17', '38', '58', '-20', '26'],
  ['18', 'Luton', '32', '6', '7', '19', '41', '68', '-27', '25'],
  ['19', 'Burnley', '33', '4', '7', '22', '31', '71', '-40', '19'],
  ['20', 'Sheffield Utd', '32', '3', '6', '23', '27', '82', '-55', '15']
];

const EXAMPLE_MATCHES = [
  // Week 30
  { week: 30, date: '2024-03-30', home: 'Arsenal', away: 'Brighton', score: '3-0' },
  { week: 30, date: '2024-03-30', home: 'Brentford', away: 'Manchester Utd', score: '1-2' },
  { week: 30, date: '2024-03-30', home: 'Nottm Forest', away: 'Crystal Palace', score: '1-1' },
  { week: 30, date: '2024-03-30', home: 'Chelsea', away: 'Burnley', score: '2-0' },
  { week: 30, date: '2024-03-30', home: 'Sheffield Utd', away: 'Fulham', score: '0-3' },
  { week: 30, date: '2024-03-30', home: 'Aston Villa', away: 'Wolves', score: '2-0' },
  { week: 30, date: '2024-03-31', home: 'Liverpool', away: 'Manchester City', score: '2-1' },
  { week: 30, date: '2024-03-31', home: 'Tottenham', away: 'Luton', score: '4-0' },
  { week: 30, date: '2024-03-31', home: 'West Ham', away: 'Everton', score: '2-2' },
  { week: 30, date: '2024-04-01', home: 'Newcastle', away: 'Bournemouth', score: '3-1' },

  // Week 31
  { week: 31, date: '2024-04-06', home: 'Crystal Palace', away: 'Manchester City', score: '1-3' },
  { week: 31, date: '2024-04-06', home: 'Wolves', away: 'West Ham', score: '2-1' },
  { week: 31, date: '2024-04-06', home: 'Aston Villa', away: 'Brentford', score: '2-0' },
  { week: 31, date: '2024-04-06', home: 'Everton', away: 'Burnley', score: '1-0' },
  { week: 31, date: '2024-04-06', home: 'Fulham', away: 'Newcastle', score: '2-2' },
  { week: 31, date: '2024-04-06', home: 'Luton', away: 'Bournemouth', score: '2-1' },
  { week: 31, date: '2024-04-07', home: 'Brighton', away: 'Arsenal', score: '1-2' },
  { week: 31, date: '2024-04-07', home: 'Manchester Utd', away: 'Liverpool', score: '1-1' },
  { week: 31, date: '2024-04-07', home: 'Sheffield Utd', away: 'Chelsea', score: '0-2' },
  { week: 31, date: '2024-04-08', home: 'Tottenham', away: 'Nottm Forest', score: '3-0' },

  // Week 32
  { week: 32, date: '2024-04-13', home: 'Newcastle', away: 'Tottenham', score: '2-2' },
  { week: 32, date: '2024-04-13', home: 'Manchester City', away: 'Luton', score: '4-0' },
  { week: 32, date: '2024-04-13', home: 'Brentford', away: 'Sheffield Utd', score: '2-0' },
  { week: 32, date: '2024-04-13', home: 'Burnley', away: 'Brighton', score: '1-2' },
  { week: 32, date: '2024-04-13', home: 'Nottm Forest', away: 'Wolves', score: '1-1' },
  { week: 32, date: '2024-04-14', home: 'Liverpool', away: 'Crystal Palace', score: '3-0' },
  { week: 32, date: '2024-04-14', home: 'West Ham', away: 'Fulham', score: '2-1' },
  { week: 32, date: '2024-04-14', home: 'Arsenal', away: 'Aston Villa', score: '2-1' },
  { week: 32, date: '2024-04-14', home: 'Bournemouth', away: 'Manchester Utd', score: '1-2' },
  { week: 32, date: '2024-04-15', home: 'Chelsea', away: 'Everton', score: '2-0' },

  // Week 33
  { week: 33, date: '2024-04-20', home: 'Arsenal', away: 'Aston Villa', score: '2-0' },
  { week: 33, date: '2024-04-20', home: 'Liverpool', away: 'Fulham', score: '3-1' },
  { week: 33, date: '2024-04-20', home: 'Wolves', away: 'Bournemouth', score: '2-1' },
  { week: 33, date: '2024-04-20', home: 'Brighton', away: 'Burnley', score: '3-0' },
  { week: 33, date: '2024-04-21', home: 'Manchester City', away: 'Chelsea', score: '2-1' },
  { week: 33, date: '2024-04-21', home: 'Tottenham', away: 'Manchester Utd', score: '2-2' },
  { week: 33, date: '2024-04-21', home: 'Brentford', away: 'Newcastle', score: '1-2' },
  { week: 33, date: '2024-04-21', home: 'Sheffield Utd', away: 'Luton', score: '1-1' },
  { week: 33, date: '2024-04-22', home: 'Crystal Palace', away: 'West Ham', score: '1-0' },
  { week: 33, date: '2024-04-22', home: 'Nottm Forest', away: 'Everton', score: '2-1' },

  // Week 34
  { week: 34, date: '2024-04-27', home: 'Liverpool', away: 'West Ham', score: '3-1' },
  { week: 34, date: '2024-04-27', home: 'Manchester City', away: 'Brighton', score: '2-0' },
  { week: 34, date: '2024-04-27', home: 'Wolves', away: 'Arsenal', score: '1-2' },
  { week: 34, date: '2024-04-27', home: 'Aston Villa', away: 'Chelsea', score: '2-2' },
  { week: 34, date: '2024-04-27', home: 'Crystal Palace', away: 'Newcastle', score: '1-1' },
  { week: 34, date: '2024-04-28', home: 'Bournemouth', away: 'Brentford', score: '2-1' },
  { week: 34, date: '2024-04-28', home: 'Manchester Utd', away: 'Sheffield Utd', score: '3-0' },
  { week: 34, date: '2024-04-28', home: 'Nottm Forest', away: 'Manchester City', score: '0-3' },
  { week: 34, date: '2024-04-29', home: 'Tottenham', away: 'Burnley', score: '2-0' },
  { week: 34, date: '2024-04-29', home: 'Everton', away: 'Luton', score: '2-1' },

  // Week 35
  { week: 35, date: '2024-05-04', home: 'Brentford', away: 'Everton', score: '2-1' },
  { week: 35, date: '2024-05-04', home: 'Burnley', away: 'Newcastle', score: '1-3' },
  { week: 35, date: '2024-05-04', home: 'Manchester City', away: 'Wolves', score: '3-0' },
  { week: 35, date: '2024-05-04', home: 'Nottm Forest', away: 'Manchester City', score: '1-2' },
  { week: 35, date: '2024-05-04', home: 'Fulham', away: 'Crystal Palace', score: '2-0' },
  { week: 35, date: '2024-05-05', home: 'Liverpool', away: 'Tottenham', score: '2-2' },
  { week: 35, date: '2024-05-05', home: 'Arsenal', away: 'Bournemouth', score: '3-1' },
  { week: 35, date: '2024-05-05', home: 'West Ham', away: 'Sheffield Utd', score: '2-0' },
  { week: 35, date: '2024-05-05', home: 'Brighton', away: 'Aston Villa', score: '1-1' },
  { week: 35, date: '2024-05-06', home: 'Chelsea', away: 'Luton', score: '2-0' },

  // Week 36
  { week: 36, date: '2024-05-11', home: 'Tottenham', away: 'Arsenal', score: '2-2' },
  { week: 36, date: '2024-05-11', home: 'Manchester Utd', away: 'Crystal Palace', score: '2-0' },
  { week: 36, date: '2024-05-11', home: 'Fulham', away: 'Manchester City', score: '1-3' },
  { week: 36, date: '2024-05-11', home: 'Everton', away: 'Sheffield Utd', score: '2-0' },
  { week: 36, date: '2024-05-11', home: 'Newcastle', away: 'Brighton', score: '2-1' },
  { week: 36, date: '2024-05-12', home: 'West Ham', away: 'Liverpool', score: '1-2' },
  { week: 36, date: '2024-05-12', home: 'Aston Villa', away: 'Tottenham', score: '2-1' },
  { week: 36, date: '2024-05-12', home: 'Nottm Forest', away: 'Chelsea', score: '1-2' },
  { week: 36, date: '2024-05-12', home: 'Brentford', away: 'Luton', score: '2-0' },
  { week: 36, date: '2024-05-13', home: 'Wolves', away: 'Burnley', score: '2-0' },

  // Week 37
  { week: 37, date: '2024-05-18', home: 'Manchester City', away: 'West Ham', score: '3-1' },
  { week: 37, date: '2024-05-18', home: 'Newcastle', away: 'Manchester Utd', score: '2-2' },
  { week: 37, date: '2024-05-18', home: 'Chelsea', away: 'Brighton', score: '2-1' },
  { week: 37, date: '2024-05-18', home: 'Liverpool', away: 'Wolves', score: '3-0' },
  { week: 37, date: '2024-05-19', home: 'Arsenal', away: 'Everton', score: '2-0' },
  { week: 37, date: '2024-05-19', home: 'Crystal Palace', away: 'Aston Villa', score: '1-2' },
  { week: 37, date: '2024-05-19', home: 'Fulham', away: 'Burnley', score: '2-0' },
  { week: 37, date: '2024-05-19', home: 'Brentford', away: 'Nottm Forest', score: '2-1' },
  { week: 37, date: '2024-05-19', home: 'Tottenham', away: 'Sheffield Utd', score: '3-0' },
  { week: 37, date: '2024-05-19', home: 'Bournemouth', away: 'Luton', score: '2-1' },

  // Week 38 (Final Day - All matches played simultaneously)
  { week: 38, date: '2024-05-26', home: 'Arsenal', away: 'Manchester City', score: '2-1' },
  { week: 38, date: '2024-05-26', home: 'Brighton', away: 'Manchester Utd', score: '2-2' },
  { week: 38, date: '2024-05-26', home: 'Chelsea', away: 'Newcastle', score: '2-1' },
  { week: 38, date: '2024-05-26', home: 'Crystal Palace', away: 'Burnley', score: '2-0' },
  { week: 38, date: '2024-05-26', home: 'Everton', away: 'Tottenham', score: '1-2' },
  { week: 38, date: '2024-05-26', home: 'Fulham', away: 'Brentford', score: '2-1' },
  { week: 38, date: '2024-05-26', home: 'Liverpool', away: 'Aston Villa', score: '3-1' },
  { week: 38, date: '2024-05-26', home: 'Luton', away: 'Wolves', score: '1-1' },
  { week: 38, date: '2024-05-26', home: 'Sheffield Utd', away: 'Bournemouth', score: '1-2' },
  { week: 38, date: '2024-05-26', home: 'West Ham', away: 'Nottm Forest', score: '2-0' }
];

const EXAMPLE_NEWS = [
  {
    id: 1,
    title: 'Arsenal maintain lead in title race',
    summary: 'A convincing win keeps the Gunners at the top of the table...',
    date: '2024-04-20',
    category: 'Match Report'
  },
  {
    id: 2,
    title: 'Injury update: Key players return to training',
    summary: 'Several teams receive boost as players return from injury...',
    date: '2024-04-19',
    category: 'Team News'
  },
  {
    id: 3,
    title: 'Transfer rumors: Summer window preview',
    summary: 'Latest transfer news and speculation from around the league...',
    date: '2024-04-18',
    category: 'Transfer News'
  },
];

type Tab = 'table' | 'matches' | 'news';

export default function LeaguePage() {
  const params = useParams() as { country: string; league: string };
  const [activeTab, setActiveTab] = React.useState<Tab>('table');
  const [selectedWeek, setSelectedWeek] = React.useState(33);

  const navigationItems = [
    { body: 'table', onClick: () => setActiveTab('table'), selected: activeTab === 'table' },
    { body: 'matches', onClick: () => setActiveTab('matches'), selected: activeTab === 'matches' },
    { body: 'news', onClick: () => setActiveTab('news'), selected: activeTab === 'news' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'table':
        return (
          <div className={styles.tableContainer}>
            <DataTable data={EXAMPLE_LEAGUE_TABLE} />
          </div>
        );
      case 'matches':
        return (
          <div className={styles.matchesContainer}>
            <Row className={styles.weekSelector}>
              <ActionListItem 
                icon="◀" 
                onClick={() => setSelectedWeek(prev => Math.max(1, prev - 1))}
              >
                prev
              </ActionListItem>
              <span className={styles.weekLabel}>week {selectedWeek}</span>
              <ActionListItem 
                icon="▶" 
                onClick={() => setSelectedWeek(prev => Math.min(38, prev + 1))}
              >
                next
              </ActionListItem>
            </Row>
            <Table>
              {EXAMPLE_MATCHES.map((match, index) => (
                <tr key={index} className={styles.matchRow}>
                  <TableColumn className={styles.matchDate}>{match.date}</TableColumn>
                  <TableColumn className={styles.homeTeam}>{match.home}</TableColumn>
                  <TableColumn className={styles.score}>{match.score}</TableColumn>
                  <TableColumn className={styles.awayTeam}>{match.away}</TableColumn>
                </tr>
              ))}
            </Table>
          </div>
        );
      case 'news':
        return (
          <div className={styles.newsContainer}>
            {EXAMPLE_NEWS.map(article => (
              <ActionListItem
                key={article.id}
                icon="⊹"
                className={styles.newsItem}
              >
                <div className={styles.newsContent}>
                  <Row className={styles.newsHeader}>
                    <span className={styles.newsTitle}>{article.title}</span>
                    <span className={styles.newsCategory}>{article.category}</span>
                  </Row>
                  <p className={styles.newsSummary}>{article.summary}</p>
                  <span className={styles.newsDate}>{article.date}</span>
                </div>
              </ActionListItem>
            ))}
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {decodeURIComponent(String(params.league)).replace(/-/g, ' ')}
      </h1>
      <div className={styles.countryInfo}>
        {decodeURIComponent(String(params.country)).replace(/-/g, ' ')}
      </div>
      
      <div className={styles.navigation}>
        <ButtonGroup items={navigationItems} />
      </div>

      <div className={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
} 