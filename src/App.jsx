import './App.css'
import NavBar from './components/NavBar'
import StatCard from './components/StatCard';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameCharts from './components/GameCharts';

function App() {
  const navigate = useNavigate();
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const today = `${year}-${month}-${day}`;


  const [games, setGames] = useState([]);
  const fetchGames = async () => {
  const response = await fetch(
    `/api/nba/games?date=${today}`,
  );

  const data = await response.json();

  setGames(data.response);
};

useEffect(() => {
    fetchGames();
    
  }, []);


  const nextGame = games
  .filter((game) => new Date(game.date) > new Date())
  .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  const completedGames = games.filter(
  (game) => game.status.short === "FT").length;

  const totalGames = games.length;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredGames = games.filter((game) => {
    const searchTerm = search.toLowerCase().trim();

    const matchesSearch =
      game.teams.home.name.toLowerCase().includes(searchTerm) ||
      game.teams.away.name.toLowerCase().includes(searchTerm);

    const status = game.status.short;

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "upcoming" && status === "NS") ||
      (statusFilter === "completed" && status === "FT") ||
      (statusFilter === "live" && !["NS", "FT", "AOT", "POST", "CANC"].includes(status));

    return matchesSearch && matchesStatus;
  });


 

  return (
    <div className='maindiv'>
      <NavBar/>

      <div className='right-side'>
        
        <div className="statcards">
          {nextGame ? (
              <StatCard maindetail="Upcoming Game:" text1={nextGame.teams.away.name} text2="Vs." text3={nextGame.teams.home.name}/>
          ) : (
            <StatCard maindetail="Upcoming Game:" text1="No more upcoming game"/>
            
          )}

         <StatCard maindetail="Total Games:" text1={totalGames}/>
         <StatCard maindetail="Completed Games Today:" text1={completedGames}/>  
        </div>

        <div className= "search-form">
          <input type="search" placeholder='Search Teams' value={search} onChange={(e) => setSearch(e.target.value)}/>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>

            <option value="all">All Games</option>
            <option value="upcoming">Upcoming Games</option>
            <option value="live">Live Games</option>
            <option value="completed">Completed Games</option>

          </select>
        </div>
        
        
          <div className="data-frame">
            <table className="games-table">
              <thead className="game-thead">
                <tr>
                  <th>Away Team</th>
                  <th>Home Team</th>
                  <th>Game Date</th>
                  <th>Game Time</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredGames.map((game) => (
                  <tr key={game.id} onClick={() => {
                    navigate(`/game/${game.id}`, {state: { game:game }
                    })
                  }}>
                    <td>{game.teams.away.name}</td>
                    <td>{game.teams.home.name}</td>

                    <td>
                      {new Date(game.date).toLocaleDateString("en-US")}
                    </td>

                    <td>
                      {new Date(game.date).toLocaleTimeString("en-US", {
                        timeZone: "America/Chicago",
                        hour: "numeric",
                        minute: "2-digit"
                      })}
                    </td>

                    <td>{game.status.long}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          

          <GameCharts games={games}/>
        
        </div>


      </div>
  )
}

export default App

