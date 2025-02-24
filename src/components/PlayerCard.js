import React from 'react';

function PlayerCard({ player, userId }) {
  if (!player || !player.response || player.response.length === 0) {
    return <div>No player data found.</div>;
  }

  const playerInfo = player.response[0].player;
  const playerStats = player.response[0].statistics[0];

  const saveFavorite = async () => {
    try {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, playerId: playerInfo.id }),
      });
      alert('Player added to favorites!');
    } catch (error) {
      console.error('Error saving favorite:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-4">
      <h2 className="text-xl font-bold">{playerInfo.name}</h2>
      <p className="text-gray-600">Age: {playerInfo.age}</p>
      <p className="text-gray-600">Nationality: {playerInfo.nationality}</p>
      <p className="text-gray-600">Height: {playerInfo.height}</p>
      <p className="text-gray-600">Weight: {playerInfo.weight}</p>
      <p className="text-gray-600">Team: {playerStats.team.name}</p>
      <p className="text-gray-600">Position: {playerStats.games.position}</p>
      <p className="text-gray-600">Goals: {playerStats.goals.total}</p>
      <p className="text-gray-600">Assists: {playerStats.goals.assists}</p>
      {userId && (
        <button onClick={saveFavorite} className="mt-2 p-2 bg-blue-500 text-white rounded">
          Add to Favorites
        </button>
      )}
    </div>
  );
}

export default PlayerCard;
