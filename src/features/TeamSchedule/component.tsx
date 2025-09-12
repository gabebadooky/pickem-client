import { Game } from "../../types/game";
import { TeamScheduleProps } from "./types";


const TeamSchedule = (props: TeamScheduleProps) => {
    const componentID: string = `${props.team.teamID}-schedule`;

    return (
        <div
            className="h-full w-full"
            id={`${componentID}-div`}
            key={`${componentID}-div`}
        >

            <h1
                className="m-auto text-center"
                id={`${componentID}-header`}
                key={`${componentID}-header`}
            >
                {props.team.teamName} {props.team.teamMascot} 2025 Schedule
            </h1>


            <table
                className="w-full"
                id={`${componentID}-table`}
                key={`${componentID}-table`}
            >
                {props.allGames.filter(game => {
                    game.awayTeamID === props.team.teamID
                        ||
                    game.homeTeamID === props.team.teamID
                }).map((game: Game) => {
                    return <>{/* <TeamScheduleRow /> */}</>
                })}
            </table>


        </div>
    );
}


export default TeamSchedule;