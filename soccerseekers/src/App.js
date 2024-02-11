import React, { useState, useEffect } from 'react';

function LeagueList() {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    // Replace 'endpoint-name' with the actual endpoint you want to hit, e.g., 'league-display'
    fetch('http://localhost:5001/welcome')
      .then(response => response.json())
      .then(data => setLeagues(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // The empty array ensures this effect runs only once after the component mounts

  return (
    <div>
      {leagues.map(league => (
        <div key={league.id}>{league.name}</div>
      ))}
    </div>
  );
}

export default LeagueList;
