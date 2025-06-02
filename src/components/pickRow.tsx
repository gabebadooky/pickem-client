import { useEffect, useState } from "react";
import { Game } from "../types/game";
import { Team, NullTeam } from "../types/team";
import { Pick, NullPick } from "../types/pick";
import { SelectedTeam } from "../types/selectedTeam";

import GameInfoCell from "./GameInfoCell";
import TeamInfoIconCell from "./TeamInfoCell";
import TeamCell from "./TeamCell";


type Props = {
    game: Game;
    teams: Team[];
    picks: Pick[];
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
    isModalCurrentlyRendered: boolean;
    setIsModalCurrentlyRendered: React.Dispatch<React.SetStateAction<boolean>>;
};

const PickRow = (props: Props) => {
    const [selectedTeam, setSelectedTeam] = useState<SelectedTeam>("none");
    const infoCellID: string = `${props.game.gameID}-row`;
    const awayTeam: Team = props.teams.find(t => t.teamID === props.game.awayTeamID) || NullTeam;
    const homeTeam: Team = props.teams.find(t => t.teamID === props.game.homeTeamID) || NullTeam;
    const gamePick: Pick = props.picks.find(p => p.gameID === props.game.gameID) || NullPick;
    
    useEffect(() => {
        switch (gamePick.teamPicked) {
            case awayTeam.teamID:
                setSelectedTeam("away");
                break;
            case homeTeam.teamID:
                setSelectedTeam("home");
                break
            default:
                setSelectedTeam("none");
        }
    }, []);

    return (
        <tr className="" id={infoCellID}>
            <TeamInfoIconCell 
                team={awayTeam}
                isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
            />

            <TeamCell 
                team={awayTeam}
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