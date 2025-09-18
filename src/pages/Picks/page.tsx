import { useEffect, useState } from "react";
import { League } from "../../types/league";
import { calculateCurrentWeek } from "../../utils/dates";
import { callGetUserPicksEndpoint } from "../../hooks/picksEndpoints";
import { callGetGamesByWeekEndpoint } from "../../hooks/gamesEndpoints";
import { PicksProps } from "./types";
import { Game } from "../../types/game";
import { Pick } from "../../types/pick";
import { LeagueNavBar } from "../../components/LeagueNavBar";
import { WeekNavBar } from "../../components/WeekNavBar";
import { UserNavBar } from "../../components/UserNavBar";
import { TeamNotes } from "../../types/teamNotes";
import { callGetTeamNotesEnpdoint } from "../../hooks/teamsEndpoints";
import { MatchupsContainer } from "../../components/MatchupsContainer";
import { validateAuthenticatedUserID } from "../../utils/auth";
import { callGetUserByIDEndpoint } from "../../hooks/userEndpoints";


const Picks = async (props: PicksProps) => {
    const [games, setGames] = useState<Game[]>(await callGetGamesByWeekEndpoint(calculateCurrentWeek()));
    const [leagueFilter, setLeagueFilter] = useState<League>("NFLCFB");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [picks, setPicks] = useState<Pick[]>(await callGetUserPicksEndpoint(validateAuthenticatedUserID()));
    const [teamNotes, setTeamNotes] = useState<TeamNotes[]>(await callGetTeamNotesEnpdoint(validateAuthenticatedUserID()));
    const [weekFilter, setWeekFilter] = useState<number>(calculateCurrentWeek());
    const [userFilter, setUserFilter] = useState<number>(validateAuthenticatedUserID());


    useEffect(() => {
        setGames(games.filter((game) => game.league.includes(leagueFilter)));
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
                <UserNavBar allUsers={props.allUsers} setUserFilter={setUserFilter} userFilter={userFilter} />
            </div>

            <div className="my-[5%] w-full" id="picks-page-matchups-container">
                <MatchupsContainer
                    allGames={games}
                    allPicks={picks}
                    allTeams={props.allTeams}
                    allTeamsNotes={teamNotes}
                    authenticatedUser={await callGetUserByIDEndpoint(validateAuthenticatedUserID())}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    setPicks={setPicks}
                    setTeamNotes={setTeamNotes}
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