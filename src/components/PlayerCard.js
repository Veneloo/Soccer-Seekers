import React from 'react';

function PlayerCard({ player, userId }) {
  if (!player) return null;

  const saveFavorite = async () => {
    try {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, playerId: player.player.id }),
      });
      alert('Player added to favorites!');
    } catch (error) {
      console.error('Error saving favorite:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-4">
      <h2 className="text-xl font-bold">{player.player.name}</h2>
      <p className="text-gray-600">Age: {player.player.age}</p>
      <p className="text-gray-600">Nationality: {player.player.nationality}</p>
      <p className="text-gray-600">Height: {player.player.height}</p>
      <p className="text-gray-600">Weight: {player.player.weight}</p>
      <p className="text-gray-600">Team: {player.statistics[0].team.name}</p>
      <p className="text-gray-600">Position: {player.statistics[0].games.position}</p>
      <p className="text-gray-600">Goals: {player.statistics[0].goals.total}</p>
      <p className="text-gray-600">Assists: {player.statistics[0].goals.assists}</p>
      {userId && (
        <button onClick={saveFavorite} className="mt-2 p-2 bg-blue-500 text-white rounded">
          Add to Favorites
        </button>
      )}
    </div>
  );
}

export default PlayerCard;