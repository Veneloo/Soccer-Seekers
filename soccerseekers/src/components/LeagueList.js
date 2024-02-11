// LeagueList.js
import React from 'react';
import League from './League';

function LeagueList({ leagues }) {
  return (
    <div className="league-list">
      {leagues.map((league) => (
        <League key={league.id} league={league} />
      ))}
    </div>
  );
}

export default LeagueList;
