/* src/pages/SearchResults.tsx */
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { fetchGames } from '../services/gameService';
import type { Game } from '../types/games';
import { Search } from "../components/Search.tsx";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const SearchResults = () => {
  const query = useQuery();
  const searchTerm = query.get('q') || '';

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchTerm) return;

    setLoading(true);
    setError(null);

    fetchGames({ page: 1, query: searchTerm })
      .then(({ data }) => setGames(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [searchTerm]);

  if (!searchTerm) return <div>Please enter a search term.</div>;
  if (loading) return <div>Loading results...</div>;
  if (error) return <div>Error: {error}</div>;
  if (games.length === 0) return <div>No results found for "{searchTerm}"</div>;

  return (
    <div className="search-results">
      <div className="home-header">
        <h1>Results for "{searchTerm}"</h1>
	<Search />
      </div>
      <div className="search-results-2">
        <ul>
          {games.map(game => (
            <li key={game.id}>
              <Link to={`/game/${game.id}`}>{game.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

