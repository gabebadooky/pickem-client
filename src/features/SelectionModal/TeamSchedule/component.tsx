import { Game } from "../../types/game";
import { ScheduleTableRow } from "./ScheduleTableRow";
import { TeamScheduleProps } from "./types";


const TeamSchedule = (props: TeamScheduleProps) => {
    const componentID: string = `${props.team.teamID}-schedule`;

    return (
        <div
            className="h-full m-auto w-full"
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


            <table
                className="m-auto w-full"
                id={`${componentID}-table`}
                key={`${componentID}-table`}
            >
                {props.allGames.filter(game => {
                    game.awayTeamID === props.team.teamID
                        ||
                    game.homeTeamID === props.team.teamID
                }).map((game: Game) => {
                    return <ScheduleTableRow allTeams={props.allTeams} game={game} team={props.team} />
                })}
            </table>


        </div>
    );
}


export default TeamSchedule;