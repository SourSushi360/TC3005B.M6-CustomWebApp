import { GameCard } from '../components/gameCard';
import { useEffect, useState } from 'react';
import { fetchGames } from '../services/gameService';
import { useSearchParams } from "react-router-dom";
import { Pagination } from "../components/Pagination";
import type { Game } from '../types/games';

export const Home = () => {
    // State for game data
    const [games, setGames] = useState<Game[]>([]);

    // States for handling pagination
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [searchParams] = useSearchParams();

    // Get query parameters for category and page
    const category = searchParams.get('category') || '';
    const searchQuery = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');

    useEffect(() => {
        const loadGames = async () => {
            try {
                setLoading(true);
                const { data, totalPages } = await fetchGames({
                    page,
                    category,
                    query: searchQuery,
                    source: 'home'
                });
                setGames(data);
                setTotalPages(totalPages);
            } catch (err) {
                setError('Failed to load games. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadGames();
    }, [page, category, searchQuery]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="home-page">
            <div className="home-header">
                <h1>Featured Games</h1>
            </div>

            <div className="game-grid">
                {loading ? (
                    <div>Loading...</div>
                ) : games.length > 0 ? (
                    games.map(game => (
                        <GameCard key={game.id} game={game} />
                    ))
                ) : (
                    <div className="no-results">
                        <p>No games found matching your search.</p>
                    </div>
                )}
            </div>

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                maxVisible={10}
            />
        </div>
    );
};

