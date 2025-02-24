import React, { useEffect, useState } from 'react';

function Favorites({ userId }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`/api/favorites/${userId}`);
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };
    fetchFavorites();
  }, [userId]);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Favorites</h2>
      {favorites.map((favorite) => (
        <div key={favorite.playerId} className="bg-white shadow-md rounded-lg p-4 mt-2">
          <p>Player ID: {favorite.playerId}</p>
        </div>
      ))}
    </div>
  );
}

export default Favorites;