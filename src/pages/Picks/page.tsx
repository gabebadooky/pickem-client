import { useEffect, useState } from "react";
import { League } from "../../types/league";

import { findUsersFavoriteTeamPrimaryColor } from "./page";
import { calculateCurrentWeek } from "../../utils/dates";
import { callGetUserPicksEndpoint } from "../../hooks/picksEndpoints";
import { callGetGamesByWeekEndpoint } from "../../hooks/gamesEndpoints";

import { Game } from "../../types/game";
import { Pick } from "../../types/pick";
import { LeagueNavBar } from "../../components/LeagueNavBar";
import { WeekNavBar } from "../../components/WeekNavBar";
import { UserNavBar } from "../../components/UserNavBar";
import { MatchupsContainer } from "../../components/MatchupsContainer";
import { useLoaderData } from "react-router";
import { Team } from "../../types/team";
import { User } from "../../types/user";
import { Leaderboard } from "../../components/Leaderboard";
import LoadingSpinner from "../../components/LoadingSpinner/component";



const Picks = () => {
    const { allTeams, allUsers, authenticatedUser }: { allTeams: Team[], allUsers: User[], authenticatedUser: User } = useLoaderData();

    const [games, setGames] = useState<Game[]>([]);
    const [leagueFilter, setLeagueFilter] = useState<League>("NFLCFB");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [picks, setPicks] = useState<Pick[]>([]);
    const [weekFilter, setWeekFilter] = useState<number>(calculateCurrentWeek());
    const [userFilter, setUserFilter] = useState<number>(authenticatedUser.userID);


    useEffect(() => {
        authenticatedUser.userID > 0 ? setUserFilter(authenticatedUser.userID) : setUserFilter(allUsers[0].userID);
    }, []);


    useEffect(() => {
        setIsLoading(true);
        callGetGamesByWeekEndpoint(weekFilter)
        .then((allGames) => {
            setGames(allGames.filter((game) => leagueFilter.includes(game.league)));
        })
        .finally(() => setIsLoading(false));
    }, [leagueFilter]);


    useEffect(() => {
        //setIsLoading(true);
        callGetUserPicksEndpoint(userFilter).then(setPicks).finally(() => setIsLoading(false));
    }, [userFilter]);


    useEffect(() => {
        setIsLoading(true);
        callGetGamesByWeekEndpoint(weekFilter).then(setGames).finally(() => setIsLoading(false));
    }, [weekFilter]);


    return (
        <div
            className="h-full m-auto w-full"
        >
            <div 
                className="fixed left-0 right-0 text-xl top-0 w-full z-100"
                id="picks-page-navigation-bars"
                style={{
                    backgroundColor: findUsersFavoriteTeamPrimaryColor(authenticatedUser.favoriteTeam, allTeams),
                    color: "#FFFFFF" //findUsersFavoriteTeamAlternateColor(authenticatedUser.favoriteTeam, allTeams)
                }}
            >
                <div className="p-2"><LeagueNavBar authenticatedUser={authenticatedUser} setLeagueFilter={setLeagueFilter} setIsLoading={setIsLoading} /></div>
                <div className="p-2"><WeekNavBar setWeekFilter={setWeekFilter} weekFilter={weekFilter} /></div>
                <div className="p-2"><UserNavBar allUsers={allUsers} authenticatedUser={authenticatedUser} setUserFilter={setUserFilter} userFilter={userFilter} /></div>
            </div>

            <div
                className="m-auto mb-[5%] mt-45 w-[90%]"
                id="picks-page-leaderboard-table-component-div"
                key="picks-page-leaderboard-table-component-div"
            >
                <Leaderboard allTeams={allTeams} allUsers={allUsers} leagueFilter={leagueFilter} weekFilter={weekFilter} />
            </div>

            {
                isLoading || games.length === 0 ? <LoadingSpinner /> :
                <>
                    <div className="my-[5%] w-full" id="picks-page-matchups-container">
                        <MatchupsContainer
                            allGames={games}
                            allPicks={picks}
                            allTeams={allTeams}
                            authenticatedUser={authenticatedUser}
                            leagueFilter={leagueFilter}
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            setPicks={setPicks}
                            userFilter={userFilter}
                        />
                    </div>

                    <div 
                        className="bottom-0 p-5 text-xl w-full"
                        id="picks-page-secondary-week-nav-bar-div"
                        style={{ backgroundColor: findUsersFavoriteTeamPrimaryColor(authenticatedUser.favoriteTeam, allTeams) }}
                    >
                        <WeekNavBar setWeekFilter={setWeekFilter} weekFilter={weekFilter} />
                    </div>
                </>
            }
            
        </div>
    );
}


export default Picks;