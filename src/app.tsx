import { useState,useEffect } from "react";
import "tailwindcss";

import { getUser } from "./services/accountAPI";
import { getGames, getTeams, getUserIDs, getUserPicks } from "./services/picksAPI";
import { validateToken } from "./services/token";

import { Game } from "./types/game";
import { Pick } from "./types/pick";
import { Team } from "./types/team";
import { Token } from "./types/token";
import { UserIDs } from "./types/userIDs";

import { CurrentUser } from "./types/account";
import Login from "./components/Login";
import Picks from "./components/Picks";
import Register from "./components/Register";


export const App = () => {
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [isModalCurrentlyRendered, setIsModalCurrentlyRendered] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<CurrentUser>({userID: -1});
    const [games, setGames] = useState(Array<Game>);
    const [picks, setPicks] = useState(Array<Pick>);
    const [teams, setTeams] = useState(Array<Team>);
    const [userIDs, setUserIDs] = useState(Array<UserIDs>);
    const [tokenStatus, setTokenStatus] = useState<Token>({userID: -1, active: false, value: ""});
    
    useEffect(() => {
        setTokenStatus(validateToken());
        getUser(validateToken().userID).then(setCurrentUser);
        getGames().then(setGames);
        getUserPicks("1").then(setPicks);
        getTeams().then(setTeams);
        getUserIDs().then(setUserIDs);
    }, []);
    
    return(
        <div id="containter">
            { (!tokenStatus.active && !isRegistering) &&  <Login setIsRegistering={setIsRegistering} /> }

            { (!tokenStatus.active && isRegistering) && <Register setIsRegistering={setIsRegistering} teams={teams} /> }

            { 
                tokenStatus.active 
                    && 
                <Picks
                    currentUser={currentUser}
                    isModalCurrentlyRendered={isModalCurrentlyRendered}
                    jwtToken={tokenStatus.value}
                    games={games}
                    picks={picks}
                    setPicks={setPicks}
                    setIsModalCurrentlyRendered={setIsModalCurrentlyRendered}
                    teams={teams}
                    userIDs={userIDs}
                /> 
            }
        </div>
    )
}