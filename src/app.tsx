import { useState,useEffect } from "react";
import "tailwindcss";

import { calculateCurrentWeek } from "./services/formatDate";
import { getUser } from "./services/accountAPI";
import { getTeams, getUserIDs, getUserPicks } from "./services/picksAPI";
import { getTeamNotes } from "./services/teamNotes";
import { checkIfSystemUnderMaintenance } from "./services/maintenanceAPI";
import { validateToken } from "./services/validateToken";

import { CurrentUser } from "./types/account";
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
import Leaderboard from "./components/Leaderboard";
import Maintenance from "./components/Maintenance";


export const App = () => {
    const [isSystemUnderMaintenance, setIsSystemIsUnderMaintenance] = useState<{"isTrue": number}>({"isTrue": 0});
    const [currentUser, setCurrentUser] = useState<CurrentUser>({userID: -1, username: ""});
    const [isAccountComponentOpen, setIsAccountComponentOpen] = useState<boolean>(false);
    const [isLeaderboardComponentOpen, setIsLeaderboardComponentOpen] = useState<boolean>(false);
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
            checkIfSystemUnderMaintenance().then(setIsSystemIsUnderMaintenance);

            const [teamsData, userIDsData] = await Promise.all([
                getTeams(),
                getUserIDs(),
                calculateCurrentWeek()
            ]);
            setTeams(teamsData);
            setUserIDs(userIDsData);
        }

        if (teams.length === 0 || userIDs.length === 0) {
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
        const queryParams: URLSearchParams = new URLSearchParams(window.location.search);
        const token: string | null = queryParams.get("access_token");
        if (token !== null) {
            localStorage.setItem("jwt", queryParams.get("access_token") || "");
            setTokenStatus(validateToken());
            window.location.replace("https://have-a-nice-pickem.onrender.com");
        }
    }, [window.location.search]);

    
    if (isSystemUnderMaintenance.isTrue == 1) {
        return <Maintenance /> 
    } else {
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
                    !isLeaderboardComponentOpen
                        &&
                    <Picks
                        currentUser={currentUser}
                        isLoading={isLoading}
                        isModalCurrentlyRendered={isModalCurrentlyRendered}
                        jwtToken={tokenStatus}
                        picks={picks}
                        setIsAccountComponentOpen={setIsAccountComponentOpen}
                        setIsLeaderboardComponentOpen={setIsLeaderboardComponentOpen}
                        setIsLoading={setIsLoading}
                        setIsModalCurrentlyRendered={setIsModalCurrentlyRendered}
                        setPicks={setPicks}
                        teams={teams}
                        teamNotes={teamNotes}
                        userIDs={userIDs}
                    /> 
                }

                { isAccountComponentOpen && <Account currentUser={currentUser} jwtToken={tokenStatus} setCurrentUser={setCurrentUser} setIsAccountComponentOpen={setIsAccountComponentOpen} teams={teams} /> }

                { isLeaderboardComponentOpen && <Leaderboard setIsLeaderboardComponentOpen={setIsLeaderboardComponentOpen} /> }
            </div>
        )
    }
}