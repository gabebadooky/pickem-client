import { useState,useEffect } from "react";
import "tailwindcss";

import { getUser } from "./services/accountAPI";
import { getGames, getTeams, getUserIDs, getUserPicks } from "./services/picksAPI";
import { getTeamNotes } from "./services/teamNotes";
import { validateToken } from "./services/validateToken";

import { CurrentUser } from "./types/account";
import { Game } from "./types/game";
import { Pick } from "./types/pick";
import { Team } from "./types/team";
import { TeamNotes } from "./types/teamNotes";
import { Token } from "./types/token";
import { UserIDs } from "./types/userIDs";

import Account from "./components/Account";
import Login from "./components/Login";
import Picks from "./components/Picks";
import Register from "./components/Register";
import LoadingSpinner from "./components/LoadingSpinner";


export const App = () => {
    const [currentUser, setCurrentUser] = useState<CurrentUser>({userID: -1, username: ""});
    const [games, setGames] = useState<Game[]>([]);
    const [isAccountComponentOpen, setIsAccountComponentOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [isModalCurrentlyRendered, setIsModalCurrentlyRendered] = useState<boolean>(false);
    const [picks, setPicks] = useState(Array<Pick>);
    const [teams, setTeams] = useState<Team[]>([]);
    const [teamNotes, setTeamNotes] = useState(Array<TeamNotes>);
    const [tokenStatus, setTokenStatus] = useState<Token>(validateToken());
    const [userIDs, setUserIDs] = useState<UserIDs[]>([]);

    useEffect(() => {
        async function fetchInitialData() {
            const [gamesData, teamsData, userIDsData] = await Promise.all([
                getGames(),
                getTeams(),
                getUserIDs(),
            ]);
            setGames(gamesData);
            setTeams(teamsData);
            setUserIDs(userIDsData);
        }

        if (games.length === 0 || teams.length === 0 || userIDs.length === 0) {
            fetchInitialData();
        }
    }, []);
    

    useEffect(() => {
        async function fetchUserRelatedData() {
            setIsLoading(true);
            try {
                const [userData, userPicksData, teamNotesData] = await Promise.all([
                    getUser(tokenStatus.userID),
                    getUserPicks(tokenStatus.userID),
                    getTeamNotes(tokenStatus.userID),
                ]);
                setCurrentUser(userData);
                setPicks(userPicksData);
                setTeamNotes(teamNotesData);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUserRelatedData();
    }, [tokenStatus]);


    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
    }, [isLoading]);

    
    return(
        <div id="containter">
            { isLoading && <LoadingSpinner /> }

            { (!tokenStatus.active && !isRegistering) && <Login setIsLoading={setIsLoading} setIsRegistering={setIsRegistering} setTokenStatus={setTokenStatus} /> }

            { (!tokenStatus.active && isRegistering) && <Register setIsLoading={setIsLoading} setIsRegistering={setIsRegistering} setTokenStatus={setTokenStatus} teams={teams} /> }

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
                    setIsLoading={setIsLoading}
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