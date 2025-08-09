import React, { useEffect, useState } from "react";

import { calculateCurrentWeek } from "../services/formatDate";
import { getGames } from "../services/picksAPI";
import { userLogout } from "../services/logout";
import { zuluTimeToLocaleFormattedDateString } from "../services/formatDate";

import { CurrentUser } from "../types/account";
import { Game } from "../types/game";
import { Pick } from "../types/pick";
import { Team } from "../types/team";
import { TeamNotes } from "../types/teamNotes";
import { Token } from "../types/token";
import { UserIDs } from "../types/userIDs";

import PickRow from "./PickRow";
import UsersDropdown from "./UserDropdown";
import WeekDropdown from "./WeekDropdown";
import LoadingSpinner from "./LoadingSpinner";


const totalWeeks: number = 19;


type Props = {
    currentUser: CurrentUser;
    isModalCurrentlyRendered: boolean;
    jwtToken: Token;
    picks: Pick[];
    setIsAccountComponentOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLeaderboardComponentOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModalCurrentlyRendered: React.Dispatch<React.SetStateAction<boolean>>;
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
    teams: Team[];
    teamNotes: TeamNotes[];
    userIDs: UserIDs[];
};


const Picks = (props: Props) => {
    const [games, setGames] = useState<Game[]>([]);
    const [isModalCurrentlyRendered, setIsModalCurrentlyRendered] = useState<boolean>(false);
    const [selectedLeague, setSelectedLeague] = useState<string>("CFBNFL");
    const [selectedWeek, setSelectedWeek] = useState<number>(calculateCurrentWeek);
    let priorGameDate: string | undefined;


    useEffect(() => {
        async function getAndSetWeekGames() {
            try {
                setGames([]);
                props.setIsLoading(true);
                getGames(selectedWeek).then(setGames);
            } finally {
                props.setIsLoading(false);
            }
        } 
        getAndSetWeekGames();
    }, [selectedWeek]);


    return (
        <div className="h-dvh m-auto w-dvw">

            <div className="grid grid-cols-6 grid-rows-1 m-auto mb-5 mt-10 w-[95%]">
                <i 
                    className="fa-solid fa-user fa-2xl text-left m-auto"
                    id="account-info-button"
                    onClick={() => {
                        if (props.currentUser.userID === -1) {
                            userLogout();
                        } else {
                            props.setIsAccountComponentOpen(true);
                        }
                    }}
                >
                </i>

                <select className="col-span-4 m-auto text-l text-center w-[82%]" id="league-dropdown-input" name="league-dropdown"
                    value={selectedLeague}
                    onChange={(e) => setSelectedLeague(e.currentTarget.value)}
                >
                    <option value="CFBNFL">All</option>
                    <option value="NFL">NFL</option>
                    <option value="CFB">CFB (All)</option>
                    <option value="CFBP4">CFB Power Conference</option>
                    <option value="CFBG6">CFB Non-Power Conference</option>
                </select>
                
                <UsersDropdown
                    currentUser={props.currentUser}
                    setIsLeaderboardComponentOpen={props.setIsLeaderboardComponentOpen}
                    setIsLoading={props.setIsLoading}
                    setPicks={props.setPicks}
                    userIDs={props.userIDs}
                />
            </div>

            <div className="grid grid-cols-6 grid-rows-1 m-auto mb-5 mt-15 w-[95%]">
                <div className="m-auto" id="previous-week-arrow">
                    { 
                        selectedWeek > 0 && 
                        <i className="fa-solid fa-arrow-left fa-2xl" 
                            onClick={() => setSelectedWeek(selectedWeek - 1) }>
                        </i>
                    }
                </div>
                
                <div className="col-span-4 m-auto">
                    <WeekDropdown weeks={totalWeeks} selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} />
                </div>
                
                <div className="m-auto" id="next-week-arrow">
                    { 
                        selectedWeek < 18 && 
                        <i className="fa-solid fa-arrow-right fa-2xl"
                            onClick={() => setSelectedWeek(selectedWeek + 1)}>
                        </i>
                    }
                </div>
            </div>

            {games.length === 0 && <LoadingSpinner />}

            <table className="border-separate border-spacing-y-5 m-auto mb-20 mt-[8%] mb-20 w-[90%]">
                <tbody key="picks-tbody">

                    {games.filter(game => selectedLeague.includes(game.league)).map((game: Game) => {
                        const key: string = `${game.gameID}-row`;
                        const localKickoffTimestampString: string = zuluTimeToLocaleFormattedDateString(game.date, game.time);

                        if (localKickoffTimestampString !== priorGameDate) {
                            priorGameDate = localKickoffTimestampString;
                            return (
                                <>
                                    <tr
                                        id={`${localKickoffTimestampString.replace(" ", "-")}-header-row`}
                                        key={`${localKickoffTimestampString.replace(" ", "-")}-header-row`}
                                    >
                                        <td
                                            className="text-3xl"
                                            key={`${localKickoffTimestampString.replace(" ", "-")}-header-cell`}
                                        >
                                            {localKickoffTimestampString}
                                        </td>
                                    </tr>
                                    <tr><td><hr /></td></tr>
                                    <PickRow
                                        key={key}
                                        currentUser={props.currentUser}
                                        game={game}
                                        isModalCurrentlyRendered={isModalCurrentlyRendered}
                                        jwtToken={props.jwtToken}
                                        picks={props.picks}
                                        selectedLeague={selectedLeague}
                                        setIsLoading={props.setIsLoading}
                                        setIsModalCurrentlyRendered={setIsModalCurrentlyRendered}
                                        setPicks={props.setPicks}
                                        teams={props.teams}
                                        teamNotes={props.teamNotes}
                                    />
                                </>
                            );
                        } else {
                            return(
                                <PickRow
                                    key={key}
                                    currentUser={props.currentUser}
                                    game={game}
                                    isModalCurrentlyRendered={isModalCurrentlyRendered}
                                    jwtToken={props.jwtToken}
                                    picks={props.picks}
                                    selectedLeague={selectedLeague}
                                    setIsLoading={props.setIsLoading}
                                    setIsModalCurrentlyRendered={setIsModalCurrentlyRendered}
                                    setPicks={props.setPicks}
                                    teams={props.teams}
                                    teamNotes={props.teamNotes}
                                />
                            );
                        }

                        
                    })}

                </tbody>
            </table>

        </div>
    );

}


export default Picks;

