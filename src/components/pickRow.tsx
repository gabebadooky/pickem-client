import PicksContainer from "./picksOld";
import GameInfoIcon from "./gameInfoIcon";
import TeamInfoIconCell from "./teamInfoIconCell";
import TeamCell from "./teamCell";

import { Team, NullTeam } from "../types/team";
import { Pick } from "../types/pick";
import { pickRowProps } from "../types/pickRowProps";
import { GameInfoProps } from "../types/gameInfoProps";
import { useContext } from "react";


const PickRow = ({ pickRowProps }: { pickRowProps: pickRowProps }) => {
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
            <TeamInfoIconCell team={awayTeam} />
            <TeamCell team={awayTeam} pick={gamePick} />
            <GameInfoIcon gameInfo={gameInfoProps} />
            <TeamCell team={homeTeam} pick={gamePick} />
            <TeamInfoIconCell team={homeTeam} />
        </tr>
    )
}

export default PickRow;