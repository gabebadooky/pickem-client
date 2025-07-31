import React, { useState } from "react";

import { userLogout } from "../services/logout";
import { zuluTimeToLocaleFormattedDateString } from "../services/formatDate";

import { CurrentUser } from "../types/account";
import { seasonWeeks } from "../services/formatDate";
import { Game } from "../types/game";
import { Pick } from "../types/pick";
import { Team } from "../types/team";
import { TeamNotes } from "../types/teamNotes";
import { Token } from "../types/token";
import { UserIDs } from "../types/userIDs";

import PickRow from "./PickRow";
//import UserDropdown from "./UserDropdown";
import WeekDropdown from "./WeekDropdown";


const now: Date = new Date();
const totalWeeks: number = 18;


type Props = {
    currentUser: CurrentUser;
    isModalCurrentlyRendered: boolean;
    jwtToken: Token;
    games: Game[];
    picks: Pick[];
    setIsAccountComponentOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModalCurrentlyRendered: React.Dispatch<React.SetStateAction<boolean>>;
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
    teams: Team[];
    teamNotes: TeamNotes[];
    userIDs: UserIDs[];
};


const setCurrentWeek = () => {
    for (let i = 0; i < totalWeeks; i++) {
        if ((seasonWeeks[i].start.setHours(0, 0, 0) <= now.setHours(0, 0, 0))
            &&
            (now.setHours(0, 0, 0) <= seasonWeeks[i].end.setHours(0, 0, 0))) {
            return i;
        }
    }
    return 18;
}


const Picks = (props: Props) => {
    const [isModalCurrentlyRendered, setIsModalCurrentlyRendered] = useState<boolean>(false);
    const [selectedLeague, setSelectedLeague] = useState<string>("CFBNFL");
    const [selectedWeek, setSelectedWeek] = useState<number>(setCurrentWeek);
    let priorGameDate: string | undefined;


    return (
        <div className="h-dvh m-auto w-dvw">

            <div className="grid grid-cols-3 grid-rows-1 m-auto mb-5 mt-10 w-[90%]">
                <i 
                    className="fa-solid fa-user fa-xl m-auto"
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

                <select name="league-dropdown" id="league-dropdown-input" className="m-auto"
                    value={selectedLeague}
                    onChange={(e) => setSelectedLeague(e.currentTarget.value)}
                >
                    <option value="CFBNFL">All</option>
                    <option value="CFB">CFB</option>
                    <option value="NFL">NFL</option>
                </select>
                
                <i 
                    className="fa-solid fa-bars fa-xl m-auto"
                    id="users-dropdown"
                ></i>
                {/*<button
                    className="bg-red-600 h-8 mx-[10%] rounded-lg" 
                    onClick={userLogout}
                >
                    Logout
                </button>*/}
            </div>

            <div className="grid grid-cols-3 grid-rows-1 m-auto mb-5 mt-10 w-[90%]">
                <div id="previous-week-arrow">
                    { 
                        selectedWeek > 0 && 
                        <i className="fa-solid fa-arrow-left fa-xl" 
                            onClick={() => setSelectedWeek(selectedWeek - 1) }>
                        </i>
                    }
                </div>
                <WeekDropdown weeks={totalWeeks} selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} />
                <div id="next-week-arrow">
                    { 
                        selectedWeek < 18 && 
                        <i className="fa-solid fa-arrow-right fa-xl"
                            onClick={() => setSelectedWeek(selectedWeek + 1)}>
                        </i>
                    }
                </div>
            </div>


            <table className="border-separate border-spacing-y-5 m-auto mt-[8%] mb-20 w-[90%]">
                <tbody key="picks-tbody">

                    {props.games.filter(game => {
                        return selectedLeague.includes(game.league) &&
                        ((game.week === selectedWeek && game.league === "CFB")
                            || (game.week === selectedWeek - 1 && game.league === "NFL"))
                    }).map((game: Game) => {
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
                                        <td key={`${localKickoffTimestampString.replace(" ", "-")}-header-cell`}>{localKickoffTimestampString}</td>
                                    </tr>
                                    <PickRow
                                        key={key}
                                        currentUser={props.currentUser}
                                        game={game}
                                        isModalCurrentlyRendered={isModalCurrentlyRendered}
                                        jwtToken={props.jwtToken}
                                        picks={props.picks}
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

