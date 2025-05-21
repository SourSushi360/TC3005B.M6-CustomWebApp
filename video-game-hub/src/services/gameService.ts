/* src/services/gameService.ts */
import type { Game } from "../types/games";

const API_BASE = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_API_KEY;

// Get all games (with optional filtering)
export const fetchGames = async (params: {
    page: number;
    pageSize?: number;
    genre?: string;
    query?: string;
}): Promise<{
    data: Game[];
    totalPages: number;
    currentPage: number;
}> => {
    const pageSize = params.pageSize || 20;
    const searchParams = new URLSearchParams({
        key: API_KEY,
        page: params.page.toString(),
        page_size: pageSize.toString()
    });

    if (params.query) {
        searchParams.append("search", params.query);
    }

    if (params.genre) {
        searchParams.append("genres", params.genre);
    }

    const response = await fetch(`${API_BASE}/games?${searchParams.toString()}`);
    if (!response.ok) {
        throw new Error("Failed to fetch games");
    }

    const json = await response.json();
    return {
        data: json.results as Game[],
        totalPages: Math.ceil(json.count / pageSize),
        currentPage: params.page
    };
};

// Fetch single game by ID
export const fetchGameById = async (id: number): Promise<Game> => {
    const response = await fetch(`${API_BASE}/games/${id}?key=${API_KEY}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch game with ID ${id}`);
    }

    const game = await response.json();
    return game as Game;
};
