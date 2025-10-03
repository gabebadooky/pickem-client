import { useEffect, useState } from "react";
import { Game } from "../../../types/game";
import { ScheduleTableRow } from "./ScheduleTableRow";
import { TeamScheduleProps } from "./types";
import { callGetGamesByTeamEndpoint } from "../../../hooks/gamesEndpoints";
import LoadingSpinner from "../../LoadingSpinner/component";


const TeamSchedule = (props: TeamScheduleProps) => {
    const [teamScheduleGames, setTeamScheduleGames] = useState<Game[]>([]);
    const componentID: string = `${props.team.teamID}-schedule`;

    
    useEffect(() => {
        callGetGamesByTeamEndpoint(props.team.teamID)
        .then(setTeamScheduleGames);
    }, [props.team.teamID]);

    
    return (
        <div
            className="h-full m-auto w-[90%]"
            id={`${componentID}-div`}
            key={`${componentID}-div`}
        >

            <h1
                className="text-center"
                id={`${componentID}-header`}
                key={`${componentID}-header`}
            >
                {props.team.teamName} {props.team.teamMascot} 2025 Schedule
            </h1>
            
            {
                teamScheduleGames.length === 0 ?
                <LoadingSpinner /> :
                
                <table
                    className="m-auto my-5 text-xs w-full"
                    id={`${componentID}-table`}
                    key={`${componentID}-table`}
                >
                    <tbody>

                        {teamScheduleGames.map((game: Game) => {
                            return (
                                <ScheduleTableRow
                                    allTeams={props.allTeams}
                                    game={game}
                                    team={props.team}
                                />
                            );
                        })}

                    </tbody>
                </table>
            }

        </div>
    );
}


export default TeamSchedule;