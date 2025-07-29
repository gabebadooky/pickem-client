import { useState,useEffect } from "react";
import "tailwindcss";

import { getUser } from "./services/accountAPI";
import { getGames, getTeams, getUserIDs, getUserPicks } from "./services/picksAPI";
import { getTeamNotes } from "./services/teamNotes";
import { validateToken } from "./services/validateToken";

import { Game } from "./types/game";
import { Pick } from "./types/pick";
import { Team } from "./types/team";
import { TeamNotes } from "./types/teamNotes";
import { Token } from "./types/token";
import { UserIDs } from "./types/userIDs";

import { CurrentUser } from "./types/account";
import Login from "./components/Login";
import Picks from "./components/Picks";
import Register from "./components/Register";
import Account from "./components/Account";


export const App = () => {
    const [currentUser, setCurrentUser] = useState<CurrentUser>({userID: -1, username: ""});
    const [games, setGames] = useState<Game[]>([]);
    const [isAccountComponentOpen, setIsAccountComponentOpen] = useState<boolean>(false);
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [isModalCurrentlyRendered, setIsModalCurrentlyRendered] = useState<boolean>(false);
    const [picks, setPicks] = useState(Array<Pick>);
    const [teams, setTeams] = useState<Team[]>([]);
    const [teamNotes, setTeamNotes] = useState(Array<TeamNotes>);
    const [tokenStatus, setTokenStatus] = useState<Token>(validateToken());
    const [userIDs, setUserIDs] = useState<UserIDs[]>([]);

    useEffect(() => {
        getGames().then(setGames);
        getTeams().then(setTeams);
        getUserIDs().then(setUserIDs);
    }, []);
    
    useEffect(() => {
        getUser(tokenStatus.userID).then(setCurrentUser);
        getUserPicks(tokenStatus.userID).then(setPicks);
        getTeamNotes(tokenStatus.userID).then(setTeamNotes);
    }, [tokenStatus]);
    
    return(
        <div id="containter">
            { (!tokenStatus.active && !isRegistering) && <Login setIsRegistering={setIsRegistering} setTokenStatus={setTokenStatus} /> }

            { (!tokenStatus.active && isRegistering) && <Register setIsRegistering={setIsRegistering} setTokenStatus={setTokenStatus} teams={teams} /> }

            { 
                tokenStatus.active
                    &&
                !isAccountComponentOpen
                    &&
                <Picks
                    currentUser={currentUser}
                    isModalCurrentlyRendered={isModalCurrentlyRendered}
                    jwtToken={tokenStatus}
                    games={games}
                    picks={picks}
                    setIsAccountComponentOpen={setIsAccountComponentOpen}
                    setIsModalCurrentlyRendered={setIsModalCurrentlyRendered}
                    setPicks={setPicks}
                    teams={teams}
                    teamNotes={teamNotes}
                    userIDs={userIDs}
                /> 
            }

            { isAccountComponentOpen && <Account currentUser={currentUser} jwtToken={tokenStatus} setIsAccountComponentOpen={setIsAccountComponentOpen} teams={teams} /> }
        </div>
    )
}