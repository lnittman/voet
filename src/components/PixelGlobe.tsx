'use client';

import styles from '@components/PixelGlobe.module.scss';
import * as React from 'react';

const WORLD_MAP = `
                                  VOET WORLD MAP
    ┌────────────────────────────────────────────────────────────┐
    │     ▄▄▄▄      ▄▄▄▄▄▄▄▄▄▄▄▄     ▄▄▄▄▄▄▄▄                 │
    │   ▄█████▄   ▄████████████████▄ ▄██████████▄     ▄▄▄▄     │
    │  ████████▄ ██████████████████████████████████▄ ▄█████▄    │
    │  █████████████████████████████████████████████████████    │
    │   ▀████████████▀▀   ▀██████████████▀▀  ▀█████████████    │
    │     ▀█████▀▀          ▀████████▀▀        ▀████████▀      │
    │                         ▀████▀             ▀▀▀▀▀         │
    │           ▄▄▄▄▄▄        ████      ▄▄▄▄▄▄                 │
    │         ▄████████▄     ▄████▄   ▄████████▄               │
    │        ██████████████████████████████████████▄           │
    │         ▀████████████████████████████████████            │
    │           ▀▀██████████████████████████████▀             │
    │              ▀▀████████████████████████▀▀               │
    │                  ▀▀▀██████████████▀▀                    │
    └────────────────────────────────────────────────────────────┘
         [NA]        [EU]        [AS]        [AF]        [OC]
`;

interface Region {
  name: string;
  leagues: Array<{
    id: string;
    name: string;
    country: string;
  }>;
}

const REGIONS: Record<string, Region> = {
  'EU': {
    name: 'Europe',
    leagues: [
      { id: 'eng.1', name: 'Premier League', country: 'England' },
      { id: 'esp.1', name: 'La Liga', country: 'Spain' },
      { id: 'ger.1', name: 'Bundesliga', country: 'Germany' },
      { id: 'ita.1', name: 'Serie A', country: 'Italy' },
      { id: 'fra.1', name: 'Ligue 1', country: 'France' },
    ]
  },
  'NA': {
    name: 'North America',
    leagues: [
      { id: 'mls.1', name: 'MLS', country: 'United States' },
      { id: 'mex.1', name: 'Liga MX', country: 'Mexico' },
    ]
  },
  'SA': {
    name: 'South America',
    leagues: [
      { id: 'bra.1', name: 'Brasileirão', country: 'Brazil' },
      { id: 'arg.1', name: 'Primera División', country: 'Argentina' },
    ]
  },
  'AS': {
    name: 'Asia',
    leagues: [
      { id: 'jpn.1', name: 'J1 League', country: 'Japan' },
      { id: 'kor.1', name: 'K League 1', country: 'South Korea' },
    ]
  },
  'AF': {
    name: 'Africa',
    leagues: [
      { id: 'zaf.1', name: 'Premier Division', country: 'South Africa' },
      { id: 'egy.1', name: 'Premier League', country: 'Egypt' },
    ]
  },
  'OC': {
    name: 'Oceania',
    leagues: [
      { id: 'aus.1', name: 'A-League', country: 'Australia' },
      { id: 'nzl.1', name: 'Premier League', country: 'New Zealand' },
    ]
  }
};

interface PixelGlobeProps {
  onSelectLeague?: (leagueId: string) => void;
}

const PixelGlobe: React.FC<PixelGlobeProps> = ({ onSelectLeague }) => {
  const [selectedRegion, setSelectedRegion] = React.useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = React.useState<string | null>(null);

  const handleRegionClick = (regionCode: string) => {
    setSelectedRegion(regionCode === selectedRegion ? null : regionCode);
  };

  return (
    <div className={styles.container}>
      <pre className={styles.map}>
        {WORLD_MAP}
      </pre>
      <div className={styles.regionButtons}>
        {Object.entries(REGIONS).map(([code, region]) => (
          <button
            key={code}
            className={styles.regionButton}
            onClick={() => handleRegionClick(code)}
            onMouseEnter={() => setHoveredRegion(code)}
            onMouseLeave={() => setHoveredRegion(null)}
            data-active={selectedRegion === code}
            data-hovered={hoveredRegion === code}
          >
            {region.name}
          </button>
        ))}
      </div>
      {selectedRegion && (
        <div className={styles.leagueSelector}>
          <h3 className={styles.leagueTitle}>{REGIONS[selectedRegion].name}</h3>
          <div className={styles.leagueList}>
            {REGIONS[selectedRegion].leagues.map(league => (
              <button
                key={league.id}
                className={styles.leagueButton}
                onClick={() => onSelectLeague?.(league.id)}
              >
                {league.name} ({league.country})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PixelGlobe; 