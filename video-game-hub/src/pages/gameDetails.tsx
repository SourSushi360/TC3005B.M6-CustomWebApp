/* src/pages/gameDetails.tsx */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Game } from '../types/games';
import { fetchGameById } from '../services/gameService';
import { Search } from "../components/Search.tsx";

export const GameDetails = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!gameId) return;

    setLoading(true);
    setError(null);

    const id = Number(gameId);

    fetchGameById(id)
      .then((data) => setGame(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [gameId]);

  if (loading) return <div>Loading game details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!game) return <div>No game data found.</div>;

  return (
    <div className="game-details-2">
      <div className="home-header">
        <h1>{game.name}</h1>
	<Search />
      </div>
      <div className="game-content-2">
        <div className="game-meta-2">
          <p><strong>Released:</strong> {game.released || 'TBA'}</p>

          <p>
            <strong>Genres:</strong>{' '}
            {Array.isArray(game.genres) && game.genres.length > 0
              ? game.genres.map(g => g.name).join(', ')
              : 'Unknown'}
          </p>

          <p>
            <strong>Platforms:</strong>{' '}
            {Array.isArray(game.platforms) && game.platforms.length > 0
              ? game.platforms.map(p => p.platform.name).join(', ')
              : 'Unknown'}
          </p>

          <p><strong>ESRB Rating:</strong> {game.esrb_rating?.name || 'Not rated'}</p>
          <p><strong>Metacritic:</strong> {game.metacritic ?? 'N/A'}</p>
          <p><strong>Playtime:</strong> {game.playtime} hours</p>
          <p><strong>Ratings:</strong> {game.rating} / {game.rating_top} ({game.ratings_count} ratings)</p>
          <p><strong>Reviews:</strong> {game.reviews_count} reviews</p>
        </div>
	<div className="game-image-2">
          <img
            src={game.background_image}
            alt={game.name}
            style={{ maxWidth: '100%', borderRadius: 8 }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-product.png';
            }}
          />
	</div>
      </div>
      


      {game.clip && game.clip.clip && (
        <div className="game-clip-2">
          <h3>Gameplay Clip</h3>
          <video
            src={game.clip.clip}
            controls
            style={{ maxWidth: '100%', borderRadius: 8 }}
          />
        </div>
      )}

      {Array.isArray(game.short_screenshots) && game.short_screenshots.length > 0 && (
        <div className="game-screenshots-2">
          <h3>Screenshots</h3>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
            {game.short_screenshots.map(s => (
              <img
                key={s.id}
                src={s.image}
                alt={`${game.name} screenshot`}
                style={{ height: 150, borderRadius: 8 }}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

