import { useEffect, useState } from "react";

import { zuluTimeToLocaleFormattedDate } from "../services/formatDate";

import { Game } from "../types/game";
import { Team, NullTeam } from "../types/team";
import { CurrentUser } from "../types/account";
import { TeamNotes } from "../types/teamNotes";
import { Token } from "../types/token";
import { Pick, NullPick } from "../types/pick";

import TeamCell from "./TeamCell";
import GameInfoCell from "./GameInfoCell";
import TeamInfoIconCell from "./TeamInfoCell";


type Props = {
    currentUser: CurrentUser;
    game: Game;
    isModalCurrentlyRendered: boolean;
    jwtToken: Token;
    picks: Pick[];
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
    setIsModalCurrentlyRendered: React.Dispatch<React.SetStateAction<boolean>>;
    teams: Team[];
    teamNotes: TeamNotes[];
};


const PickRow = (props: Props) => {
    const userGamePick: Pick = props.picks.find(pick => pick.gameID === props.game.gameID) || NullPick
    const awayTeam: Team = props.teams.find(team => team.teamID === props.game.awayTeamID) || NullTeam;
    const homeTeam: Team = props.teams.find(team => team.teamID === props.game.homeTeamID) || NullTeam;
    const localKickoffDateTimestamp: Date = zuluTimeToLocaleFormattedDate(props.game.date, props.game.time);

    
    return(
        <tr className="flex h-[20%] m-auto w-full" id={`${props.game.gameID}-row`}>
                                
            <TeamInfoIconCell
                isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
                team={awayTeam}
            />

            <TeamCell
                currentUser={props.currentUser}
                isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                jwtToken={props.jwtToken}
                localKickoffTimestamp={localKickoffDateTimestamp}
                pick={userGamePick}
                picks={props.picks}
                setPicks={props.setPicks}
                setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
                team={awayTeam}
            />

            <GameInfoCell
                awayTeam={awayTeam}
                game={props.game}
                homeTeam={homeTeam}
                isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
            />

            <TeamCell
                currentUser={props.currentUser}
                isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                jwtToken={props.jwtToken}
                localKickoffTimestamp={localKickoffDateTimestamp}
                pick={userGamePick}
                picks={props.picks}
                setPicks={props.setPicks}
                setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
                team={homeTeam}
            />

            <TeamInfoIconCell
                isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
                team={homeTeam}
            />

        </tr>
    );

}


export default PickRow;

























/*
const PickRow = (props: Props) => {
    const awayTeam: Team = props.teams.find(t => t.teamID === props.game.awayTeamID) || NullTeam;
    const homeTeam: Team = props.teams.find(t => t.teamID === props.game.homeTeamID) || NullTeam;
    const gamePick: Pick = props.picks.find(p => p.gameID === props.game.gameID) || NullPick;
    const [selectedTeam, setSelectedTeam] = useState<string | null>("");
    const gameDate: Date = new Date(props.game.date);
    const gameYear = new Date(gameDate).getFullYear();
    const gameMonth = new Date(gameDate).getMonth();
    const gameDay = new Date(gameDate).getDate() + 1;
    const [zuluHours, zuluMinutes] = props.game.time.split(":");
    const utcDate = new Date(gameYear, gameMonth, gameDay, Number(zuluHours), Number(zuluMinutes), 0);
    const localKickoffTimestamp = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);

    useEffect(() => {
        setSelectedTeam(gamePick.teamPicked);
    }, []);

    return (
        <tr className="flex h-[20%] m-auto w-full" id={`${gamePick.gameID}-row`}>
            <TeamInfoIconCell
                className="m-auto w-1/5"
                team={awayTeam}
                isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
            />

            <TeamCell
                team={awayTeam}
                isAwayTeam={true}
                isHomeTeam={false}
                pick={gamePick}
                picks={props.picks}
                localKickoffTimestamp={localKickoffTimestamp}
                setPicks={props.setPicks}
                selectedTeam={selectedTeam}
                setSelectedTeam={setSelectedTeam}
                isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
            />
            
            <GameInfoCell
                game={props.game}
                awayTeam={awayTeam}
                homeTeam={homeTeam}
                isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
            />
            
            <TeamCell
                team={homeTeam}
                isAwayTeam={false}
                isHomeTeam={true}
                pick={gamePick}
                picks={props.picks}
                localKickoffTimestamp={localKickoffTimestamp}
                setPicks={props.setPicks}
                selectedTeam={selectedTeam}
                setSelectedTeam={setSelectedTeam}
                isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
            />
            
            <TeamInfoIconCell
                team={homeTeam}
                isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
            />
        </tr>
    )
}
*/