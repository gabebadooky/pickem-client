import { useState } from "react";
import { Game } from "../types/game";
import { Team, NullTeam } from "../types/team";
import { Pick, NullPick } from "../types/pick";

import TeamCell from "./TeamCell";
import GameInfoCell from "./GameInfoCell";
import TeamInfoIconCell from "./TeamInfoCell";


type Props = {
    game: Game;
    teams: Team[];
    picks: Pick[];
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
    isModalCurrentlyRendered: boolean;
    setIsModalCurrentlyRendered: React.Dispatch<React.SetStateAction<boolean>>;
};

const PickRow = (props: Props) => {
    const awayTeam: Team = props.teams.find(t => t.teamID === props.game.awayTeamID) || NullTeam;
    const homeTeam: Team = props.teams.find(t => t.teamID === props.game.homeTeamID) || NullTeam;
    const gamePick: Pick = props.picks.find(p => p.gameID === props.game.gameID) || NullPick;
    const infoCellID: string = `${gamePick.gameID}-row`;
    const awayTeamInfoCellID: string = `${awayTeam.teamID}-info`;
    const homeTeamInfoCellID: string = `${homeTeam.teamID}-info`;
    const awayTeamCellID: string = `${awayTeam.teamID}-cell`;
    const homeTeamCellID: string = `${homeTeam.teamID}-cell`;
    const [selectedTeam, setSelectedTeam] = useState<string | null>(gamePick.teamPicked);
    if (awayTeamInfoCellID === "teamID-info" || homeTeamInfoCellID === "teamID-info") {
        //console.log(`Game ${props.game.gameID}\nAway Team: ${props.game.awayTeamID}\nHome Team: ${props.game.homeTeamID}`);
        console.log(`Game Away Team: ${props.game.awayTeamID}\nAway Team: ${awayTeam.teamID}\nGame Home Team: ${props.game.homeTeamID}\nHome Team: ${homeTeam.teamID}`);
    }

    return (
        <tr id={infoCellID}>
            <TeamInfoIconCell
                key={awayTeamInfoCellID}
                team={awayTeam}
                isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
            />

            <TeamCell
                key={awayTeamCellID}
                team={awayTeam}
                isAwayTeam={true}
                isHomeTeam={false}
                pick={gamePick}
                picks={props.picks}
                setPicks={props.setPicks}
                selectedTeam={selectedTeam}
                setSelectedTeam={setSelectedTeam}
                isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
            />
            
            <GameInfoCell
                key={props.game.gameID}
                game={props.game}
                awayTeam={awayTeam}
                homeTeam={homeTeam}
                isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
            />
            
            <TeamCell
                key={homeTeamCellID}
                team={homeTeam}
                isAwayTeam={false}
                isHomeTeam={true}
                pick={gamePick}
                picks={props.picks}
                setPicks={props.setPicks}
                selectedTeam={selectedTeam}
                setSelectedTeam={setSelectedTeam}
                isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
            />
            
            <TeamInfoIconCell
                key={homeTeamInfoCellID}
                team={homeTeam}
                isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
            />
        </tr>
    )
}

export default PickRow;
