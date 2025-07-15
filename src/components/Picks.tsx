import { useEffect, useState } from "react";
import { data, Link, useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { Game } from "../types/game";
import { Team } from "../types/team";
import { Pick } from "../types/pick";
import { UserIDs } from "../types/userIDs";
import { getUserPicks } from "../services/picksAPI";
import { tokenStillValid } from "../services/validateToken";
import WeekDropdown from "./WeekDropdown";
import PickRow from "./PickRow";
import LoadingSpinner from "./LoadingSpinner";
import { createPortal } from "react-dom";


type Props = {
    games: Game[];
    teams: Team[];
    userIDs: UserIDs[];
};


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
            const loggedInUserID = jwtDecode(localStorage.getItem("jwt") || "").sub?.toString() || "0";
            //getGames().then(setGames);
            //getTeams().then(setTeams);
            getUserPicks(loggedInUserID).then(setPicks).finally(() => setIsLoading(false));
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

                                const gameDate: Date = new Date(game.date);
                                const gameYear = new Date(gameDate).getFullYear();
                                const gameMonth = new Date(gameDate).getMonth();
                                const gameDay = new Date(gameDate).getDate() + 1;
                                const [zuluHours, zuluMinutes] = game.time.split(":");
                                console.log(zuluHours, zuluMinutes);
                                const zuluDatetimeStamp: Date = new Date(gameYear, gameMonth, gameDay);

                                if (game.date !== priorGameDate) {
                                    priorGameDate = game.date;
                                    
                                    //zuluDatetimeStamp.setUTCHours(Number(zuluHours), Number(zuluMinutes));
                                    console.log(`game.date: ${game.date.toString()}\ngame.time: ${game.time}\nzuluDateTimeStamp: ${zuluDatetimeStamp}`);
                                    
                                    //let formattedGamedate: string = new Date(String(game.date).substring(0, 16)).toLocaleDateString("en-us", {
                                    let formattedGamedate: string = zuluDatetimeStamp.toLocaleDateString("en-us", {
                                        weekday: "long",
                                        month: "long",
                                        day: "numeric"
                                    });
                                    console.log(formattedGamedate);

                                    return (
                                        <>
                                            <tr className="m-auto mt-[10%] w-full">
                                                <th className="mx-auto w-full">{formattedGamedate}</th>
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

export default Picks;