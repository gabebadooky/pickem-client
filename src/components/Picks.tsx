import { useEffect, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { Game } from "../types/game";
import { Team } from "../types/team";
import { Pick } from "../types/pick";
import { UserIDs } from "../types/userIDs";
import { getUserPicks } from "../services/picksAPI";
import { tokenStillValid } from "../services/token";
import WeekDropdown from "./WeekDropdown";
import PickRow from "./PickRow";
import LoadingSpinner from "./LoadingSpinner";
import { createPortal } from "react-dom";
import { CurrentUser } from "../types/account";
import UserDropdown from "./UserDropdown";
import { userLogout } from "../services/logout";


type Props = {
    currentUser: CurrentUser;
    jwtToken: string;
    games: Game[];
    teams: Team[];
    userIDs: UserIDs[];
};


const Picks = (props: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isModalCurrentlyRendered, setIsModalCurrentlyRendered] = useState<boolean>(false);
    const [viewPicksOfUser, setViewPicksOfUser] = useState<number>(0);
    const [selectedWeek, setSelectedWeek] = useState<number>(0);
    const navigate: NavigateFunction = useNavigate();
    let priorGameDate: Date | undefined;
    let viewPicksUser: number = props.currentUser.userID;

    return (
        <div className="h-dvh m-auto w-dvw">

            {
                isLoading &&
                (createPortal( <LoadingSpinner />, document.body))
            }

            <div className="grid grid-cols-3 grid-rows-1 mb-3 mt-6 w-[90%]">
                <Link to="/account"><i className="fa-solid fa-user"></i></Link>

                <UserDropdown currentUser={props.currentUser} setViewPicksOfUser={setViewPicksOfUser} userIDs={props.userIDs} />
                
                <button onClick={userLogout} >Logout</button>
            </div>

            <div className="grid grid-cols-3 grid-rows-1 mb-3 mt-2 w-[90%]">
                <div id="previous-week-arrow">
                    { 
                        selectedWeek > 0 && 
                        <i className="fa-solid fa-arrow-left" 
                            onClick={() => setSelectedWeek(selectedWeek - 1) }>
                        </i>
                    }
                </div>
                <WeekDropdown weeks={18} selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} />
                <div id="next-week-arrow">
                    { 
                        selectedWeek < 18 && 
                        <i className="fa-solid fa-arrow-right" 
                            onClick={() => setSelectedWeek(selectedWeek + 1)}>
                        </i>
                    }
                </div>
            </div>


            <table className="border-separate border-spacing-3 m-auto mt-[5%] w-[90%]">
                <tbody>

                    {props.games.filter(game => game.week === selectedWeek).map((game: Game) => {

                    })}

                </tbody>
            </table>

        </div>
    );

}


export default Picks;


/*
const Picks = (props: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [picks, setPicks] = useState(Array<Pick>);
    const [week, setWeek] = useState<number>(0);
    const [isModalCurrentlyRendered, setIsModalCurrentlyRendered] = useState<boolean>(false);
    const navigate = useNavigate();

    let priorGameDate: Date | undefined;

    useEffect(() => {
        setIsLoading(true);
        if (tokenStillValid()) {
            if (localStorage.getItem("jwt") == "guest") {
                getUserPicks(props.userIDs[0].userID.toString()).then(setPicks).finally(() => setIsLoading(false));
            } else {
                const loggedInUserID = jwtDecode(localStorage.getItem("jwt") || "").sub?.toString() || "0";
                getUserPicks(loggedInUserID).then(setPicks).finally(() => setIsLoading(false));
            }
            setWeek(0);
        } else {
            localStorage.clear();
            navigate("/");
        }
    }, []);

    return (
        <div>
            {
                isLoading
                    &&
                (createPortal(
                    <LoadingSpinner />,
                    document.body
                ))
            }

            {
                !isLoading
                    &&
                <div>
                    <table className="m-auto mt-3 w-[90%]">
                        <tbody>
                            <tr>
                                <td>
                                    <Link to="/account"><i className="fa-solid fa-user"></i></Link>
                                </td>

                                <td>
                                    <select 
                                        name="usersDropdown" 
                                        id="usersDropdownInput"
                                        value={picks[0].userID}
                                        onChange={(e) => {
                                            setIsLoading(true);
                                            getUserPicks(e.target.value).then(setPicks).finally(() => setIsLoading(false));
                                        }}
                                    >
                                        {props.userIDs.map((user: UserIDs) => (
                                            <option key={user.userID} value={user.userID}>{user.username}</option>
                                        ))}
                                    </select>
                                </td>

                                <td>
                                    <button 
                                        onClick={() => {
                                            localStorage.clear();
                                            navigate("/");
                                            window.location.reload();
                                        }}
                                    >
                                        Logout
                                    </button>
                                </td>
                            </tr>
                            <tr><td><br /></td></tr>
                            <tr>
                                <td className="w-5">
                                    { 
                                        week > 0 
                                            && 
                                        <i className="fa-solid fa-arrow-left" 
                                            onClick={() => setWeek(week - 1) }>
                                        </i>
                                    }
                                </td>
                                
                                <td className="">
                                    <WeekDropdown weeks={18} selectedWeek={week} setWeek={setWeek} />
                                </td>
                                
                                <td className="w-5">
                                    { 
                                        week < 18 
                                            && 
                                        <i className="fa-solid fa-arrow-right" 
                                            onClick={() => setWeek(week + 1)}>
                                        </i>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table className="border-separate border-spacing-3 m-auto mt-[5%] w-[90%]">
                        <tbody>

                            {props.games.filter(game => game.week === week).map((game: Game) => {

                                if (game.date !== priorGameDate) {
                                    priorGameDate = game.date;

                                    const dateStringElements: string[] = game.date.toString().replace(",", "").split(" ");
                                    const timeStringElements: string[] = game.time.split(":");
                                    const gameYear: string = dateStringElements[3];
                                    /*const gameMonth = {"Jan": "January", "Feb": "February", "Mar": "March", 
                                                        "Apr": "April", "May": "May", "Jun": "June", "Jul": "July", 
                                                        "Aug": "August", "Sep": "September", "Oct": "October",
                                                        "Nov": "November", "Dec": "December"}[dateStringElements[2]]; ***
                                    const gameMonth: string = {"Jan": "1", "Feb": "2", "Mar": "3", "Apr": "4", "May": "5", 
                                                        "Jun": "6", "Jul": "7", "Aug": "8", "Sep": "9", "Oct": "10", 
                                                        "Nov": "11", "Dec": "12"}[dateStringElements[2]]?.padStart(2, "0") || "00";
                                    const gameDay: string = dateStringElements[1].padStart(2, "0");
                                    /*const gameDay: number = {"Mon": "Monday", "Tue": "Tuesday", 
                                                        "Wed": "Wednesday", "Thu": "Thursday", 
                                                        "Fri": "Friday", "Sat": "Saturday", 
                                                        "Sun": "Sunday"}[dateStringElements[0]]; ***
                                    let [gameHour, gameMinute]: [string, string] = [timeStringElements[0].padStart(2, "0"), timeStringElements[1].padStart(2, "0")];
                                    if (gameHour == "04" && gameMinute == "00") {
                                        gameHour = "23";
                                    }
                                    const zuluDatetime = new Date(`${gameYear}-${gameMonth}-${gameDay}T${gameHour}:${gameMinute}Z`);
                                    console.log(`game.date: ${game.date}\ngameDay: ${gameDay}\ngameHour: ${gameHour}\ngameMinute: ${gameMinute}\nzuluDatetime: ${zuluDatetime}`);
                                    const formattedDate = zuluDatetime.toLocaleDateString("en-us", {weekday: "long", month: "long", day: "numeric"});

                                    return (
                                        <>
                                            <tr className="m-auto mt-[10%] w-full">
                                                <th className="mx-auto w-full">{formattedDate}</th>
                                            </tr>
                                            <PickRow
                                                key={game.gameID}
                                                game={game}
                                                teams={props.teams}
                                                picks={picks}
                                                setPicks={setPicks}
                                                isModalCurrentlyRendered={isModalCurrentlyRendered}
                                                setIsModalCurrentlyRendered={setIsModalCurrentlyRendered}
                                            />
                                        </>
                                    );
                                } else {
                                    return (
                                        <PickRow
                                            key={game.gameID}
                                            game={game}
                                            teams={props.teams}
                                            picks={picks}
                                            setPicks={setPicks}
                                            isModalCurrentlyRendered={isModalCurrentlyRendered}
                                            setIsModalCurrentlyRendered={setIsModalCurrentlyRendered}
                                        />
                                    );
                                }

                            })
                            }

                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

*/