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
    const [selectedTeam, setSelectedTeam] = useState<string | null>(gamePick.teamPicked);

    return (
        <tr className="flex h-[20%] m-auto w-full" id={`${gamePick.gameID}-row`}>
            <TeamInfoIconCell
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

export default PickRow;
