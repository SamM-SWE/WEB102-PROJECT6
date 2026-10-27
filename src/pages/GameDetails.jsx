import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";


export default function GameDetails() {
    const location = useLocation();
    const navigate = useNavigate();

    const game = location.state?.game;

    if (!game) {
        return (
            <div className="maindiv">
                <NavBar/>
                <div className="right-side">
                    <p className="error-tag" >Error: Game data unavaiable, <br/> please return to Dashboard</p>
                </div>
                
            </div>
        ) 
    }

    return (
        <div className="maindiv">
            <NavBar/>


            <div className="right-side">
                <div className="detail-frame">
                    <h1>Game Details</h1>

                    
                    <div className="top-details">
                        <h2 className="topDetail-paragraph">Status: <br/> {game.status.long} </h2>
                        <h2 className="topDetail-paragraph">League: <br/> {game.league.name} </h2>
                        <h2 className="topDetail-paragraph">Date: <br/>{new Date(game.date).toLocaleString("en-US", {
                            timeZone: "America/Chicago"
                        })} </h2>
                        
                    </div>


                    <div className="team-information">
                        <div className="teamData">
                            <h2 className="detail-paragraph">{game.teams.away.name}</h2>
                            <img src={game.teams.away.logo} alt="Away team logo" className="team-img"/>
                            <h2 className="detail-paragraph">{game.scores.away.total ?? "-"}</h2>
                        </div>

                        <h1 className="vs-text">VS.</h1>


                        <div className="teamData">
                            <h2 className="detail-paragraph">{game.teams.home.name}</h2>
                            <img src={game.teams.home.logo} alt="Home team log" className="team-img"/>
                            <h2 className="detail-paragraph">{game.scores.home.total ?? "-"}</h2>
                        </div>
                    </div>

                    

                

                    
                    
                    <p>
                        
                    </p>

                

                </div>
            </div>
        </div>
    )

}