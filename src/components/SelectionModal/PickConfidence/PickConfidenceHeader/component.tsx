import { formattedTeamRecord } from "../component";
import { PickConfidenceHeaderProps } from "./types";


const PickConfidenceHeader = (props: PickConfidenceHeaderProps) => {
    if (props.selectedTeam.teamID === props.awayTeam.teamID) {
        return (
            <h1 className="h-full m-auto text-center w-full">
                {props.awayTeam.teamName} {props.awayTeam.teamMascot} {props.awayTeam.ranking !== null ? `#${props.awayTeam.ranking}` : ""} ({`${formattedTeamRecord(props.awayTeam.overallWins, props.awayTeam.overallLosses, props.awayTeam.overallTies)}`})
                <br /> 
                over
                <br />
                {props.homeTeam.teamName} {props.homeTeam.teamMascot} {props.homeTeam.ranking !== null ? `#${props.homeTeam.ranking}` : ""} ({`${formattedTeamRecord(props.homeTeam.overallWins, props.homeTeam.overallLosses, props.homeTeam.overallTies)}`})
            </h1>
        );
    } else {
        return (
            <h1 className="h-full m-auto text-center w-full">
                {props.homeTeam.teamName} {props.homeTeam.teamMascot} {props.awayTeam.ranking !== null ? `#${props.awayTeam.ranking}` : ""} ({`${formattedTeamRecord(props.homeTeam.overallWins, props.homeTeam.overallLosses, props.homeTeam.overallTies)}`})
                <br />
                over
                <br />
                {props.awayTeam.teamName} {props.awayTeam.teamMascot} {props.homeTeam.ranking !== null ? `#${props.homeTeam.ranking}` : ""} ({`${formattedTeamRecord(props.awayTeam.overallWins, props.awayTeam.overallLosses, props.awayTeam.overallTies)}`})
            </h1>
        );
    }
}


export default PickConfidenceHeader;