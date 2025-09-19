import { useEffect, useState } from "react";
import { League } from "../../types/league";
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


const Picks = () => {
    const { allTeams, allUsers, authenticatedUser }: { allTeams: Team[], allUsers: User[], authenticatedUser: User } = useLoaderData();

    const [games, setGames] = useState<Game[]>([]);
    const [leagueFilter, setLeagueFilter] = useState<League>("NFLCFB");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [picks, setPicks] = useState<Pick[]>([]);
    const [weekFilter, setWeekFilter] = useState<number>(calculateCurrentWeek());
    const [userFilter, setUserFilter] = useState<number>(authenticatedUser.userID);


    useEffect(() => {
        callGetGamesByWeekEndpoint(weekFilter)
        .then((allGames) => {
            setGames(allGames.filter((game) => leagueFilter.includes(game.league)));
        });
    }, [leagueFilter]);


    useEffect(() => {
        callGetUserPicksEndpoint(userFilter).then(setPicks);
    }, [userFilter]);


    useEffect(() => {
        callGetGamesByWeekEndpoint(weekFilter).then(setGames);
    }, [weekFilter]);


    return (
        <div
            className="h-full m-auto w-full"
        >
            <div className="top-0 w-full" id="picks-page-navigation-bars">
                <LeagueNavBar setLeagueFilter={setLeagueFilter} />
                <WeekNavBar setWeekFilter={setWeekFilter} weekFilter={weekFilter} />
                <UserNavBar allUsers={allUsers} setUserFilter={setUserFilter} userFilter={userFilter} />
            </div>

            <div className="my-[5%] w-full" id="picks-page-matchups-container">
                <MatchupsContainer
                    allGames={games}
                    allPicks={picks}
                    allTeams={allTeams}
                    authenticatedUser={authenticatedUser}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    setPicks={setPicks}
                    userFilter={userFilter}
                />
            </div>

            <div className="bottom-0 w-full" id="picks-page-secondary-week-nav-bar-div">
                <WeekNavBar setWeekFilter={setWeekFilter} weekFilter={weekFilter} />
            </div>
            
        </div>
    );
}


export default Picks;