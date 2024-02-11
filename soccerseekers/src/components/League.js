// League.js
function League({ league }) {
    return (
      <div className="league">
        <h2>{league.name}</h2>
        <p>Country: {league.country}</p>
      </div>
    );
  }
  
  export default League;
  