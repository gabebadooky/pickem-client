import { Team, NullTeam } from "../types/team";
import { Pick } from "../types/pick";
import { pickRowProps } from "../types/pickRowProps";
import { GameInfoProps } from "../types/gameInfoProps";

import GameInfoIcon from "./GameInfoCell";
import TeamInfoIconCell from "./TeamInfoCell";
import TeamCell from "./teamCell";


const PickRow = ({ pickRowProps, isModalCurrentlyRendered, setIsModalCurrentlyRendered }: { pickRowProps: pickRowProps, isModalCurrentlyRendered: boolean, setIsModalCurrentlyRendered: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const infoCellID: string = `${pickRowProps.game.gameID}-row`;
    const nullTeam: Pick = {
        gameID: pickRowProps.game.gameID,
        userID: pickRowProps.picks[0].userID,
        teamPicked: "",
        pickWeight: ""
    }
    const awayTeam: Team = pickRowProps.teams.find(t => t.teamID === pickRowProps.game.awayTeamID) || NullTeam;
    const homeTeam: Team = pickRowProps.teams.find(t => t.teamID === pickRowProps.game.homeTeamID) || NullTeam;
    const gamePick: Pick = pickRowProps.picks.find(p => p.gameID === pickRowProps.game.gameID) || nullTeam;
    const gameInfoProps: GameInfoProps = {
        game: pickRowProps.game,
        awayTeam: awayTeam,
        homeTeam: homeTeam
    }

    return (
        <tr className="" id={infoCellID}>
            <TeamInfoIconCell team={awayTeam} isModalCurrentlyRendered={isModalCurrentlyRendered} setIsModalCurrentlyRendered={setIsModalCurrentlyRendered} />
            <TeamCell team={awayTeam} pick={gamePick} isModalCurrentlyRendered={isModalCurrentlyRendered} setIsModalCurrentlyRendered={setIsModalCurrentlyRendered} />
            <GameInfoIcon gameInfo={gameInfoProps} isModalCurrentlyRendered={isModalCurrentlyRendered} setIsModalCurrentlyRendered={setIsModalCurrentlyRendered} />
            <TeamCell team={homeTeam} pick={gamePick} isModalCurrentlyRendered={isModalCurrentlyRendered} setIsModalCurrentlyRendered={setIsModalCurrentlyRendered} />
            <TeamInfoIconCell team={homeTeam} isModalCurrentlyRendered={isModalCurrentlyRendered} setIsModalCurrentlyRendered={setIsModalCurrentlyRendered} />
        </tr>
    )
}

export default PickRow;