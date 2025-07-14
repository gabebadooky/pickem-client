import { useState,useEffect } from "react";
import "tailwindcss";
import { tokenStillValid } from "./services/validateToken";
import { Game } from "./types/game";
import { Team } from "./types/team";
import { UserIDs } from "./types/userIDs";
import { getGames, getTeams, getUserIDs } from "./services/picksAPI";
import Login from "./components/Login";
import Picks from "./components/Picks";


export const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [games, setGames] = useState(Array<Game>);
    const [teams, setTeams] = useState(Array<Team>);
    const [userIDs, setUserIDs] = useState(Array<UserIDs>);
    

    useEffect(() => {
        setIsAuthenticated(tokenStillValid());
        getGames().then(setGames);
        getTeams().then(setTeams);
        getUserIDs().then(setUserIDs);
    }, [isAuthenticated]);

    return(
        <div id="containter">
            { 
                !isAuthenticated 
                    && 
                <Login /> 
            }
            { 
                isAuthenticated 
                    && 
                <Picks games={games} teams={teams} userIDs={userIDs} /> 
            }
        </div>
    )
}