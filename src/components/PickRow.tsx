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
    selectedLeague: string;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModalCurrentlyRendered: React.Dispatch<React.SetStateAction<boolean>>;
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
    teams: Team[];
    teamNotes: TeamNotes[];
};


const PickRow = (props: Props) => {
    const userGamePick: Pick = props.picks.find(pick => pick.gameID === props.game.gameID) || NullPick;
    const awayTeam: Team = props.teams.find(team => team.teamID === props.game.awayTeamID) || NullTeam;
    const homeTeam: Team = props.teams.find(team => team.teamID === props.game.homeTeamID) || NullTeam;
    const localKickoffDateTimestamp: Date = zuluTimeToLocaleFormattedDate(props.game.date, props.game.time);

    
    if (
            (userGamePick && awayTeam.teamName !== "teamName" && homeTeam.teamName !== "teamName")
                && 
            (
                (props.selectedLeague === "CFBP4" && (awayTeam.powerConference == true || homeTeam.powerConference == true))
                    ||
                (props.selectedLeague === "CFBG6" && (awayTeam.powerConference == false || homeTeam.powerConference == false))
                    ||
                (props.selectedLeague === "CFBT25" && (awayTeam.ranking !== null || homeTeam.ranking !== null))
                    ||
                (props.selectedLeague === "CFB" || props.selectedLeague === "NFL" || props.selectedLeague === "CFBNFL")
            )
        ) {
        return(
            <tr className="flex h-[35%] m-auto w-full" id={`${props.game.gameID}-row`}>
                                    
                <TeamInfoIconCell
                    key={`${awayTeam.teamID}-team-info-icon-cell`}
                    isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                    jwtToken={props.jwtToken}
                    setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
                    team={awayTeam}
                    teamNotes={props.teamNotes}
                />

                <TeamCell
                    key={`${awayTeam.teamID}-team-cell`}
                    currentUser={props.currentUser}
                    game={props.game}
                    isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                    jwtToken={props.jwtToken}
                    localKickoffTimestamp={localKickoffDateTimestamp}
                    pick={userGamePick}
                    picks={props.picks}
                    setIsLoading={props.setIsLoading}
                    setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
                    setPicks={props.setPicks}
                    team={awayTeam}
                />

                <GameInfoCell
                    key={`${userGamePick.gameID}-game-info-cell`}
                    awayTeam={awayTeam}
                    game={props.game}
                    homeTeam={homeTeam}
                    isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                    localKickoffTimestamp={localKickoffDateTimestamp}
                    setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
                />

                <TeamCell
                    key={`${homeTeam.teamID}-team-cell`}
                    currentUser={props.currentUser}
                    game={props.game}
                    isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                    jwtToken={props.jwtToken}
                    localKickoffTimestamp={localKickoffDateTimestamp}
                    pick={userGamePick}
                    picks={props.picks}
                    setIsLoading={props.setIsLoading}
                    setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
                    setPicks={props.setPicks}
                    team={homeTeam}
                />

                <TeamInfoIconCell
                    key={`${homeTeam.teamID}-team-info-icon-cell`}
                    isModalCurrentlyRendered={props.isModalCurrentlyRendered}
                    jwtToken={props.jwtToken}
                    setIsModalCurrentlyRendered={props.setIsModalCurrentlyRendered}
                    team={homeTeam}
                    teamNotes={props.teamNotes}
                />

            </tr>
        );
    }
}


export default PickRow;
