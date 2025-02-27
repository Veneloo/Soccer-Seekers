import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ onSearch }) {
  const [playerId, setPlayerId] = useState('');
  const [leagueId, setLeagueId] = useState(''); // State for league ID
  const [season, setSeason] = useState('2025'); // State for season, default to 2025

  const handleSearch = async () => {
    if (season.length !== 4 || isNaN(season)) {
      console.error("Season must be a four-digit number");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/api/players/${playerId}?season=${season}&league=${leagueId}`);
      onSearch(response.data);  // explicitly pass fetched data up to App.js
    } catch (error) {
      console.error("Error fetching player:", error);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={playerId}
        onChange={(e) => setPlayerId(e.target.value)}
        placeholder="Enter player ID"
        className="p-2 border rounded"
      />
      <input
        type="text"
        value={leagueId}
        onChange={(e) => setLeagueId(e.target.value)}
        placeholder="Enter league ID" // Input for league ID
        className="p-2 border rounded"
      />
      <input
        type="text"
        value={season}
        onChange={(e) => setSeason(e.target.value)}
        placeholder="Enter season (4-digit)" // Input for season
        className="p-2 border rounded"
      />
      <button onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
