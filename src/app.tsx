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
    const [currentUser, setCurrentUser] = useState<CurrentUser>();
    const [games, setGames] = useState(getGames());
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [isModalCurrentlyRendered, setIsModalCurrentlyRendered] = useState<boolean>(false);
    const [picks, setPicks] = useState(Array<Pick>);
    const [teams, setTeams] = useState(getTeams());
    const [tokenStatus, setTokenStatus] = useState<Token>(validateToken());
    const [userIDs, setUserIDs] = useState(getUserIDs());
    
    useEffect(() => {
        getUser(tokenStatus.userID).then(setCurrentUser);
        getUserPicks(tokenStatus.userID).then(setPicks);
    }, [tokenStatus]);
    
    return(
        <div id="containter">
            { (!tokenStatus.active && !isRegistering) &&  <Login setIsRegistering={setIsRegistering} setTokenStatus={setTokenStatus} /> }

            { (!tokenStatus.active && isRegistering) && <Register setIsRegistering={setIsRegistering} setTokenStatus={setTokenStatus} teams={teams} /> }

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