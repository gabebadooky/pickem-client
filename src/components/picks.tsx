import { useEffect, useState } from "react";

const gamesEndpoint: string = "http://127.0.0.1:5000/games";
const teamsEndpoint: string = "http://127.0.0.1:5000/teams";
const picksEndpoint: string = "http://127.0.0.1:5000/picks/gbtest3";
const submitPickEndpoint: string = "http://127.0.0.1:5000/picks/submit"

interface Pick {
    gameID: string;
    teamPicked: string;
    pickWeight: string;
    username: string;
}

interface Game {
    gameID: string;
    league: string;
    week: number;
    year: number;
    awayTeamID: string;
    homeTeamID: string;
    date: Date;
    time: string;
    tvCoverage: string;
    stadium: string;
    city: string;
    state: string;
    gameFinished: boolean;
    cbsAwayMoneyline: string;
    cbsHomeMoneyline: string;
    cbsAwaySpread: string;
    cbsHomeSpread: string;
    cbsOverUnder: string;
    cbsAwayWinPercentage: string;
    espnAwayMoneyline: string;
    espnHomeMoneyline: string;
    espnAwaySpread: string;
    espnHomeSpread: string;
    espnOverUnder: string;
    espnAwayWinPercentage: string;
    foxAwayMoneyline: string;
    foxHomeMoneyline: string;
    foxAwaySpread: string;
    foxHomeSpread: string;
    foxOverUnder: string;
    foxAwayWinPercentage: string;
    vegasAwayMoneyline: string;
    vegasHomeMoneyline: string;
    vegasAwaySpread: string;
    vegasHomeSpread: string;
    vegasOverUnder: string;
    vegasAwayWinPercentage: string;
    awayQ1BoxScore: number;
    awayQ2BoxScore: number;
    awayQ3BoxScore: number;
    awayQ4BoxScore: number;
    awayOvertimeBoxScore: number;
    awayTotalBoxScore: number;
    homeQ1BoxScore: number;
    homeQ2BoxScore: number;
    homeQ3BoxScore: number;
    homeQ4BoxScore: number;
    homeOvertimeBoxScore: number;
    homeTotalBoxScore: number;
}

interface Team {
    teamID: string;
    cbsCode: string;
    espnCode: string;
    foxCode: string;
    vegasCode: string;
    conferenceCode: number;
    conferenceName: string;
    divisionName: string;
    teamName: string;
    teamMascot: string;
    powerConference: boolean;
    team_logo_url: string;
    primaryColor: string;
    alternateColor: string;
    overallWins: number;
    overallLosses: number;
    overallTies: number;
    conferenceWins: number;
    conferenceLosses: number;
    conferenceTies: number;
}

const PickRow = (pickProps: Pick, gameProps: Game, teamProps: Team) => {
    return (
        <div>
            
        </div>
    )
}



const PicksContainer = () => {
    const [games, setGames] = useState([]);
    const [teams, setTeams] = useState([]);
    const [allUserPicks, setAllUserPicks] = useState([]);
    const [week, setWeek] = useState(1);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch(gamesEndpoint);
                if (!response.ok) {
                    console.log(`Request error! ${response.status}`);
                } else {
                    const data = await response.json();
                    setGames(data);
                    console.log("Games:")
                    console.log(data);
                }
            } catch (err) {
                console.log(`Request failed! ${err}`)
            }
        }

        fetchGames();
    }, [setGames]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch(teamsEndpoint);
                if (!response.ok) {
                    console.log(`Request error! ${response.status}`);
                } else {
                    const data = await response.json();
                    setTeams(data);
                    console.log("Teams:")
                    console.log(data);
                }
            } catch (err) {
                console.log(`Request failed! ${err}`)
            }
        }

        fetchTeams();
    }, [setTeams]);

    useEffect(() => {
        const fetchUserPicks = async () => {
            try {
                const response = await fetch(picksEndpoint);
                if (!response.ok) {
                    console.log(`Request error! ${response.status}`);
                } else {
                    const data = await response.json();
                    setAllUserPicks(data);
                    console.log("Picks:")
                    console.log(data);
                }
            } catch (err) {
                console.log(`Request failed! ${err}`)
            }
        }

        fetchUserPicks();
    }, [setAllUserPicks]);

    const submitPick = async (pick: Pick) => {
        try {
            const response = await fetch(submitPickEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "username": pick.username,
                    "gameID": pick.gameID,
                    "teamPicked": pick.teamPicked,
                    "pickWeight": pick.pickWeight
                })
            });
    
            if (!response.ok) {
                console.log(`Request error! ${response.status}`);
            }
            const submitPickResponse = await response.json();
            console.log(`Request response: ${submitPickResponse}`);
        } catch (err) {
            console.log(`Request error! ${err}`);
        }
    }

    return (
        <div>
        </div>
    )
}

export default PicksContainer;