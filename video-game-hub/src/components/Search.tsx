/* src/components/Search.tsx */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="search"
        placeholder="Search games..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        aria-label="Search games"
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};
