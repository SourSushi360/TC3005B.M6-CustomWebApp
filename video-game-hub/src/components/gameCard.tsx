/* src/components/gameCard.tsx */
import { Link } from 'react-router-dom';
import type { Game } from '../types/games';

type GameCardProps = {
    game: Game;
};

export const GameCard = ({ game }: GameCardProps) => {
    return (
        <div className="game-card">
            <Link to={`/game/${game.id}`} className="game-image-link">
                <img
                    src={game.background_image}
                    alt={game.name}
                    loading="lazy"
                    className="game-image"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-product.png';
                    }}
                />
            </Link>

            <div className="game-info">
                <span className="game-category">
                    {game.genres?.map(g => g.name).join(', ') || 'Unknown Genre'}
                </span>

                <h3 className="game-title">
                    <Link to={`/game/${game.id}`}>{game.name}</Link>
                </h3>

                <div className="game-footer">
                    <span className="game-playtime">
                        Playtime: {game.playtime}h
                    </span>
                </div>
            </div>
        </div>
    );
};

