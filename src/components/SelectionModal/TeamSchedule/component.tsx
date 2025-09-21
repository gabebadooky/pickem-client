import { Game } from "../../../types/game";
import { ScheduleTableRow } from "./ScheduleTableRow";
import { TeamScheduleProps } from "./types";


const TeamSchedule = (props: TeamScheduleProps) => {
    const componentID: string = `${props.team.teamID}-schedule`;

    
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


            <table
                className="m-auto my-5 w-full"
                id={`${componentID}-table`}
                key={`${componentID}-table`}
            >
                <tbody>

                    {props.allGames.filter(game => (
                        game.awayTeamID === props.team.teamID
                            ||
                        game.homeTeamID === props.team.teamID
                    )).map((game: Game) => {
                        console.log(`yuh: ${game.gameID}`);
                        return (<ScheduleTableRow allTeams={props.allTeams} game={game} team={props.team} />);
                    })}

                </tbody>
            </table>


        </div>
    );
}


export default TeamSchedule;