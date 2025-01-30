'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import styles from '@components/LeagueSelector.module.scss';
import TreeView from '@components/TreeView';

interface League {
  id: string;
  name: string;
  tier: number;
  path: string;
}

interface Country {
  name: string;
  leagues: League[];
}

interface Continent {
  name: string;
  countries: {
    [key: string]: Country;
  };
}

const LEAGUES_BY_CONTINENT: {
  [key: string]: Continent;
} = {
  europe: {
    name: 'europe',
    countries: {
      england: {
        name: 'england',
        leagues: [
          { id: 'eng.1', name: 'premier league', tier: 1, path: '/england/premier-league' },
          { id: 'eng.2', name: 'championship', tier: 2, path: '/england/championship' },
          { id: 'eng.3', name: 'league one', tier: 3, path: '/england/league-one' },
          { id: 'eng.4', name: 'league two', tier: 4, path: '/england/league-two' }
        ]
      },
      spain: {
        name: 'spain',
        leagues: [
          { id: 'esp.1', name: 'la liga', tier: 1, path: '/spain/la-liga' },
          { id: 'esp.2', name: 'la liga 2', tier: 2, path: '/spain/la-liga-2' },
          { id: 'esp.3', name: 'primera rfef', tier: 3, path: '/spain/primera-rfef' }
        ]
      },
      germany: {
        name: 'germany',
        leagues: [
          { id: 'ger.1', name: 'bundesliga', tier: 1, path: '/germany/bundesliga' },
          { id: 'ger.2', name: '2. bundesliga', tier: 2, path: '/germany/2-bundesliga' },
          { id: 'ger.3', name: '3. liga', tier: 3, path: '/germany/3-liga' }
        ]
      },
      italy: {
        name: 'italy',
        leagues: [
          { id: 'ita.1', name: 'serie a', tier: 1, path: '/italy/serie-a' },
          { id: 'ita.2', name: 'serie b', tier: 2, path: '/italy/serie-b' },
          { id: 'ita.3', name: 'serie c', tier: 3, path: '/italy/serie-c' }
        ]
      },
      france: {
        name: 'france',
        leagues: [
          { id: 'fra.1', name: 'ligue 1', tier: 1, path: '/france/ligue-1' },
          { id: 'fra.2', name: 'ligue 2', tier: 2, path: '/france/ligue-2' },
          { id: 'fra.3', name: 'national', tier: 3, path: '/france/national' }
        ]
      },
      netherlands: {
        name: 'netherlands',
        leagues: [
          { id: 'ned.1', name: 'eredivisie', tier: 1, path: '/netherlands/eredivisie' },
          { id: 'ned.2', name: 'eerste divisie', tier: 2, path: '/netherlands/eerste-divisie' }
        ]
      },
      portugal: {
        name: 'portugal',
        leagues: [
          { id: 'por.1', name: 'primeira liga', tier: 1, path: '/portugal/primeira-liga' },
          { id: 'por.2', name: 'liga portugal 2', tier: 2, path: '/portugal/liga-portugal-2' }
        ]
      },
      belgium: {
        name: 'belgium',
        leagues: [
          { id: 'bel.1', name: 'jupiler pro league', tier: 1, path: '/belgium/jupiler-pro-league' },
          { id: 'bel.2', name: 'challenger pro league', tier: 2, path: '/belgium/challenger-pro-league' }
        ]
      },
      scotland: {
        name: 'scotland',
        leagues: [
          { id: 'sco.1', name: 'premiership', tier: 1, path: '/scotland/premiership' },
          { id: 'sco.2', name: 'championship', tier: 2, path: '/scotland/championship' }
        ]
      },
      turkey: {
        name: 'turkey',
        leagues: [
          { id: 'tur.1', name: 'süper lig', tier: 1, path: '/turkey/super-lig' },
          { id: 'tur.2', name: '1. lig', tier: 2, path: '/turkey/1-lig' }
        ]
      }
    }
  },
  south_america: {
    name: 'south america',
    countries: {
      brazil: {
        name: 'brazil',
        leagues: [
          { id: 'bra.1', name: 'brasileirão série a', tier: 1, path: '/brazil/serie-a' },
          { id: 'bra.2', name: 'brasileirão série b', tier: 2, path: '/brazil/serie-b' }
        ]
      },
      argentina: {
        name: 'argentina',
        leagues: [
          { id: 'arg.1', name: 'primera división', tier: 1, path: '/argentina/primera-division' },
          { id: 'arg.2', name: 'primera nacional', tier: 2, path: '/argentina/primera-nacional' }
        ]
      },
      uruguay: {
        name: 'uruguay',
        leagues: [
          { id: 'uru.1', name: 'primera división', tier: 1, path: '/uruguay/primera-division' },
          { id: 'uru.2', name: 'segunda división', tier: 2, path: '/uruguay/segunda-division' }
        ]
      },
      colombia: {
        name: 'colombia',
        leagues: [
          { id: 'col.1', name: 'categoría primera a', tier: 1, path: '/colombia/primera-a' },
          { id: 'col.2', name: 'categoría primera b', tier: 2, path: '/colombia/primera-b' }
        ]
      },
      chile: {
        name: 'chile',
        leagues: [
          { id: 'chi.1', name: 'primera división', tier: 1, path: '/chile/primera-division' },
          { id: 'chi.2', name: 'primera b', tier: 2, path: '/chile/primera-b' }
        ]
      }
    }
  },
  north_america: {
    name: 'north america',
    countries: {
      usa: {
        name: 'united states',
        leagues: [
          { id: 'usa.1', name: 'major league soccer', tier: 1, path: '/usa/mls' },
          { id: 'usa.2', name: 'usl championship', tier: 2, path: '/usa/usl-championship' }
        ]
      },
      mexico: {
        name: 'mexico',
        leagues: [
          { id: 'mex.1', name: 'liga mx', tier: 1, path: '/mexico/liga-mx' },
          { id: 'mex.2', name: 'liga de expansión', tier: 2, path: '/mexico/liga-expansion' }
        ]
      },
      canada: {
        name: 'canada',
        leagues: [
          { id: 'can.1', name: 'canadian premier league', tier: 1, path: '/canada/premier-league' }
        ]
      }
    }
  },
  asia: {
    name: 'asia',
    countries: {
      japan: {
        name: 'japan',
        leagues: [
          { id: 'jpn.1', name: 'j1 league', tier: 1, path: '/japan/j1-league' },
          { id: 'jpn.2', name: 'j2 league', tier: 2, path: '/japan/j2-league' }
        ]
      },
      korea: {
        name: 'south korea',
        leagues: [
          { id: 'kor.1', name: 'k league 1', tier: 1, path: '/korea/k-league-1' },
          { id: 'kor.2', name: 'k league 2', tier: 2, path: '/korea/k-league-2' }
        ]
      },
      china: {
        name: 'china',
        leagues: [
          { id: 'chn.1', name: 'super league', tier: 1, path: '/china/super-league' },
          { id: 'chn.2', name: 'china league', tier: 2, path: '/china/china-league' }
        ]
      },
      saudi_arabia: {
        name: 'saudi arabia',
        leagues: [
          { id: 'sau.1', name: 'saudi pro league', tier: 1, path: '/saudi-arabia/pro-league' },
          { id: 'sau.2', name: 'first division league', tier: 2, path: '/saudi-arabia/first-division' }
        ]
      }
    }
  },
  africa: {
    name: 'africa',
    countries: {
      egypt: {
        name: 'egypt',
        leagues: [
          { id: 'egy.1', name: 'premier league', tier: 1, path: '/egypt/premier-league' }
        ]
      },
      morocco: {
        name: 'morocco',
        leagues: [
          { id: 'mar.1', name: 'botola pro', tier: 1, path: '/morocco/botola-pro' }
        ]
      },
      south_africa: {
        name: 'south africa',
        leagues: [
          { id: 'rsa.1', name: 'premier division', tier: 1, path: '/south-africa/premier-division' }
        ]
      },
      nigeria: {
        name: 'nigeria',
        leagues: [
          { id: 'nga.1', name: 'nigeria premier league', tier: 1, path: '/nigeria/premier-league' }
        ]
      }
    }
  },
  oceania: {
    name: 'oceania',
    countries: {
      australia: {
        name: 'australia',
        leagues: [
          { id: 'aus.1', name: 'a-league men', tier: 1, path: '/australia/a-league' }
        ]
      },
      new_zealand: {
        name: 'new zealand',
        leagues: [
          { id: 'nzl.1', name: 'national league', tier: 1, path: '/new-zealand/national-league' }
        ]
      }
    }
  }
};

interface LeagueSelectorProps {
  onSelectLeague?: (leagueId: string) => void;
}

const LeagueSelector: React.FC<LeagueSelectorProps> = ({ onSelectLeague }) => {
  const router = useRouter();
  const [focusedContinent, setFocusedContinent] = React.useState<string | null>(null);
  const [focusedCountry, setFocusedCountry] = React.useState<string | null>(null);
  const [focusedLeague, setFocusedLeague] = React.useState<string | null>(null);
  const [expandedContinents, setExpandedContinents] = React.useState<string[]>([]);
  const [expandedCountries, setExpandedCountries] = React.useState<string[]>([]);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const clearFocus = () => {
    setFocusedContinent(null);
    setFocusedCountry(null);
    setFocusedLeague(null);
  };

  const setFocus = (type: 'continent' | 'country' | 'league', id: string) => {
    clearFocus();
    switch (type) {
      case 'continent':
        setFocusedContinent(id);
        break;
      case 'country':
        setFocusedCountry(id);
        break;
      case 'league':
        setFocusedLeague(id);
        break;
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && !focusedContinent && !focusedCountry && !focusedLeague) {
        e.preventDefault();
        const continents = Object.keys(LEAGUES_BY_CONTINENT);
        if (continents.length > 0) {
          setFocus('continent', continents[0]);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [focusedContinent, focusedCountry, focusedLeague]);

  const handleLeagueClick = React.useCallback((league: League) => {
    if (onSelectLeague) {
      onSelectLeague(league.id);
    }
    router.push(league.path);
  }, [onSelectLeague, router]);

  const toggleContinent = (continentId: string) => {
    setExpandedContinents(prev => 
      prev.includes(continentId) 
        ? prev.filter(id => id !== continentId)
        : [...prev, continentId]
    );
  };

  const toggleCountry = (countryId: string) => {
    setExpandedCountries(prev => 
      prev.includes(countryId)
        ? prev.filter(id => id !== countryId)
        : [...prev, countryId]
    );
  };

  const handleNavigate = (direction: 'up' | 'down') => {
    const continents = Object.keys(LEAGUES_BY_CONTINENT);
    
    if (!focusedContinent && !focusedCountry && !focusedLeague) {
      setFocus('continent', continents[0]);
      return;
    }

    const currentContinentIndex = continents.indexOf(focusedContinent || '');
    const currentContinent = focusedContinent ? LEAGUES_BY_CONTINENT[focusedContinent] : null;
    const countries = currentContinent ? Object.keys(currentContinent.countries) : [];
    
    if (focusedLeague) {
      const currentCountry = currentContinent && Object.entries(currentContinent.countries).find(([_, c]) => 
        c.leagues.some(l => l.id === focusedLeague)
      );
      if (currentCountry) {
        const leagues = currentCountry[1].leagues;
        const currentLeagueIndex = leagues.findIndex(l => l.id === focusedLeague);
        
        if (direction === 'down' && currentLeagueIndex < leagues.length - 1) {
          setFocus('league', leagues[currentLeagueIndex + 1].id);
        } else if (direction === 'up') {
          if (currentLeagueIndex > 0) {
            setFocus('league', leagues[currentLeagueIndex - 1].id);
          } else {
            setFocus('country', currentCountry[0]);
          }
        }
      }
    } else if (focusedCountry) {
      const currentCountryIndex = countries.indexOf(focusedCountry);
      
      if (direction === 'down') {
        if (expandedCountries.includes(focusedCountry)) {
          const country = currentContinent?.countries[focusedCountry];
          if (country && country.leagues.length > 0) {
            setFocus('league', country.leagues[0].id);
          } else if (currentCountryIndex < countries.length - 1) {
            setFocus('country', countries[currentCountryIndex + 1]);
          }
        } else if (currentCountryIndex < countries.length - 1) {
          setFocus('country', countries[currentCountryIndex + 1]);
        }
      } else if (direction === 'up') {
        if (currentCountryIndex > 0) {
          const prevCountry = countries[currentCountryIndex - 1];
          if (expandedCountries.includes(prevCountry)) {
            const prevCountryLeagues = currentContinent?.countries[prevCountry].leagues;
            if (prevCountryLeagues && prevCountryLeagues.length > 0) {
              setFocus('league', prevCountryLeagues[prevCountryLeagues.length - 1].id);
            } else {
              setFocus('country', prevCountry);
            }
          } else {
            setFocus('country', prevCountry);
          }
        } else {
          setFocus('continent', focusedContinent!);
        }
      }
    } else if (focusedContinent) {
      if (direction === 'down') {
        if (expandedContinents.includes(focusedContinent) && countries.length > 0) {
          setFocus('country', countries[0]);
        } else if (currentContinentIndex < continents.length - 1) {
          setFocus('continent', continents[currentContinentIndex + 1]);
        }
      } else if (direction === 'up') {
        if (currentContinentIndex > 0) {
          const prevContinent = continents[currentContinentIndex - 1];
          if (expandedContinents.includes(prevContinent)) {
            const prevContinentCountries = Object.keys(LEAGUES_BY_CONTINENT[prevContinent].countries);
            if (prevContinentCountries.length > 0) {
              const lastCountry = prevContinentCountries[prevContinentCountries.length - 1];
              if (expandedCountries.includes(lastCountry)) {
                const lastCountryLeagues = LEAGUES_BY_CONTINENT[prevContinent].countries[lastCountry].leagues;
                if (lastCountryLeagues.length > 0) {
                  setFocus('league', lastCountryLeagues[lastCountryLeagues.length - 1].id);
                } else {
                  setFocus('country', lastCountry);
                }
              } else {
                setFocus('country', lastCountry);
              }
            } else {
              setFocus('continent', prevContinent);
            }
          } else {
            setFocus('continent', prevContinent);
          }
        }
      }
    }
  };

  return (
    <div className={styles.container} ref={containerRef} tabIndex={-1}>
      {Object.entries(LEAGUES_BY_CONTINENT).map(([continentId, continent]) => (
        <div key={continentId} className={styles.treeViewItem}>
          <TreeView 
            title={continent.name}
            defaultValue={expandedContinents.includes(continentId)}
            onToggle={() => toggleContinent(continentId)}
            isFocused={focusedContinent === continentId}
            onNavigate={handleNavigate}
          >
            {Object.entries(continent.countries).map(([countryId, country]) => (
              <TreeView 
                key={countryId} 
                title={country.name}
                defaultValue={expandedCountries.includes(countryId)}
                onToggle={() => toggleCountry(countryId)}
                isFocused={focusedCountry === countryId}
                onNavigate={handleNavigate}
              >
                {country.leagues.map(league => (
                  <TreeView
                    key={league.id}
                    title={league.name}
                    isFile={true}
                    onClick={() => handleLeagueClick(league)}
                    isFocused={focusedLeague === league.id}
                    onNavigate={handleNavigate}
                  />
                ))}
              </TreeView>
            ))}
          </TreeView>
        </div>
      ))}
    </div>
  );
};

export default LeagueSelector; 