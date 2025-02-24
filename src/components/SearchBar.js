import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ onSearch }) {
  const [playerId, setPlayerId] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/players/${playerId}?season=2025`);
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
      <button onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
